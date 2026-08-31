import initSqlJs from "./.output/server/_libs/sql.js.mjs";

const SQL = await initSqlJs();
const database = new SQL.Database();
database.run(`
  CREATE TABLE IF NOT EXISTS reservations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    reservation_date TEXT NOT NULL,
    reservation_time TEXT NOT NULL,
    guests TEXT NOT NULL,
    occasion TEXT NOT NULL,
    reservation_notes TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`);
console.log("schema created");
