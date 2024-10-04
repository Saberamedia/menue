const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

db.serialize(() => {
    // Tabelle erstellen
    db.run(`CREATE TABLE IF NOT EXISTS your_table_name (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )`);

    // Beispielwerte einfügen
    const stmt = db.prepare(`INSERT INTO your_table_name (name) VALUES (?)`);
    stmt.run('Beispielname 1');
    stmt.run('Beispielname 2');
    stmt.run('Beispielname 3');
    stmt.finalize();
});

db.close();
