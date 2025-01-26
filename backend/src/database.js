const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../data/watchmov.db');
const db = new sqlite3.Database(dbPath);

function initializeDatabase() {
  db.serialize(() => {
    // Create movies table
    db.run(`CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      tmdb_id INTEGER,
      poster_path TEXT,
      category TEXT NOT NULL,
      genres TEXT,
      overview TEXT,
      release_date TEXT,
      rating REAL,
      trailer_url TEXT,
      streaming_links TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Create categories table for custom categories
    db.run(`CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Insert default categories if they don't exist
    const defaultCategories = ['To Watch', 'Watching', 'Watched'];
    defaultCategories.forEach(category => {
      db.run('INSERT OR IGNORE INTO categories (name) VALUES (?)', [category]);
    });
  });
}

module.exports = {
  db,
  initializeDatabase
};
