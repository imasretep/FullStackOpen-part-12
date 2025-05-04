import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const db = new sqlite3.Database(resolve(__dirname, '../lights.db'), (err) => {
//   if (err) console.error(err);
//   else console.log('Connected to SQLite database.');
// });

// const dbPath = resolve(__dirname, './lights.db');
// const db = new sqlite3.Database(dbPath, (err) => {
//   if (err) console.error('Database error:', err);
//   else console.log('Connected to SQLite database.');
// });


// db.run(`
//   CREATE TABLE IF NOT EXISTS light_logs (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     timestamp TEXT NOT NULL
//   )
// `);

const dbPath = resolve(__dirname, '../database/lights.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database.');
    db.run(`
      CREATE TABLE IF NOT EXISTS light_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL
      )
    `, (err) => {
      if (err) console.error('Table creation error:', err);
    });
  }
});

export default db;
