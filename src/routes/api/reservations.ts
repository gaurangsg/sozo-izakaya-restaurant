import { createFileRoute } from "@tanstack/react-router";
import { createReservation, parseReservation } from "@/server/reservations";

const requests = new Map<string, number[]>();
const MAX_REQUESTS_PER_HOUR = 5;
const HOUR_MS = 60 * 60 * 1000;

function jsonError(message: string, status: number) {
  return Response.json({ ok: false, message }, { status });
}

function hasAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return origin === null || origin === new URL(request.url).origin;
}

function isRateLimited(request: Request) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (requests.get(key) ?? []).filter((at) => now - at < HOUR_MS);
  if (recent.length >= MAX_REQUESTS_PER_HOUR) return true;
  recent.push(now);
  requests.set(key, recent);
  return false;
}

export const Route = createFileRoute("/api/reservations")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!hasAllowedOrigin(request)) return jsonError("Invalid request origin.", 403);
        if (Number(request.headers.get("content-length") ?? 0) > 10_000) {
          return jsonError("Request is too large.", 413);
        }
        if (isRateLimited(request)) {
          return jsonError("Too many requests. Please try again later.", 429);
        }

        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return jsonError("Invalid request body.", 400);
        }

        const data = payload as { website?: unknown; reservation?: unknown };
        // Silently accept bot submissions without storing them.
        if (typeof data.website === "string" && data.website.trim() !== "") {
          return Response.json({ ok: true });
        }

        const parsed = parseReservation(data.reservation);
        if (!parsed.success) return jsonError("Please check the booking details and try again.", 400);

        try {
          const reservation = await createReservation(parsed.data);
          return Response.json({ ok: true, reservation }, { status: 201 });
        } catch (error) {
          console.error("Unable to save reservation", error);
          return jsonError("We could not save your request. Please call us instead.", 500);
        }
      },
    },
  },
});
