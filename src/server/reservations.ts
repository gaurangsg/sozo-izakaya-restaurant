import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import initSqlJs from "sql.js/dist/sql-asm.js";
import { z } from "zod";
import { sendReservationEmail } from "./email";

const reservationSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(20).regex(/^[0-9+\-\s()]+$/),
  email: z.string().trim().max(255).email().or(z.literal("")),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  guests: z.string().regex(/^(?:[1-9]|10|12\+)$/),
  occasion: z.string().trim().max(60),
  notes: z.string().trim().max(500),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

type Database = Awaited<ReturnType<typeof initSqlJs>>["Database"] extends new (
  ...args: never[]
) => infer Instance
  ? Instance
  : never;

const databasePath = resolve(
  process.env.RESERVATIONS_DB_PATH ?? resolve(process.cwd(), ".data", "reservations.sqlite"),
);
let databasePromise: Promise<Database> | undefined;
let writeQueue: Promise<unknown> = Promise.resolve();

async function getDatabase(): Promise<Database> {
  if (!databasePromise) {
    databasePromise = (async () => {
      const SQL = await initSqlJs();
      await mkdir(dirname(databasePath), { recursive: true });
      const bytes = await readFile(databasePath).catch((error: NodeJS.ErrnoException) => {
        if (error.code === "ENOENT") return undefined;
        throw error;
      });
      const database = bytes ? new SQL.Database(bytes) : new SQL.Database();
      database.run(
        "CREATE TABLE IF NOT EXISTS reservations (id TEXT PRIMARY KEY, name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT NOT NULL, reservation_date TEXT NOT NULL, reservation_time TEXT NOT NULL, guests TEXT NOT NULL, occasion TEXT NOT NULL, reservation_notes TEXT NOT NULL, created_at TEXT NOT NULL)",
      );
      return database;
    })();
  }
  return databasePromise;
}

async function persist(database: Database) {
  const temporaryPath = `${databasePath}.${randomUUID()}.tmp`;
  await writeFile(temporaryPath, database.export());
  await rename(temporaryPath, databasePath);
}

export function parseReservation(value: unknown) {
  return reservationSchema.safeParse(value);
}

export async function createReservation(input: ReservationInput) {
  const id = randomUUID();
  const createdAt = new Date().toISOString();

  const work = writeQueue.then(async () => {
    const database = await getDatabase();
    database.run(
      `INSERT INTO reservations (
        id, name, phone, email, reservation_date, reservation_time,
        guests, occasion, reservation_notes, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        input.name,
        input.phone,
        input.email,
        input.date,
        input.time,
        input.guests,
        input.occasion,
        input.notes,
        createdAt,
      ],
    );
    await persist(database);

    // Send email notification to restaurant
    await sendReservationEmail({ ...input, id });
  });

  writeQueue = work.catch(() => undefined);
  await work;
  return { id, createdAt };
}
