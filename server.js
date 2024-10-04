const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Fügen Sie dies hinzu, um statische Dateien zu servieren
app.use(express.static(path.join(__dirname, 'public')));

// Route für die Root-URL hinzufügen
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// SQLite-Datenbank erstellen und öffnen
const db = new sqlite3.Database('data.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// API-Endpunkt zum Abrufen von Daten
app.get('/api/data', (req, res) => {
    db.all('SELECT * FROM your_table_name', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// API-Endpunkt zum Aktualisieren von Daten
app.put('/api/data/:id', (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    db.run('UPDATE your_table_name SET name = ? WHERE id = ?', [name, id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Daten aktualisiert', changes: this.changes });
    });
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
