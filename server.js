const express = require('express');
const oracledb = require('oracledb');
const dbConfig = dbConfig;

const app = express();
const port = 3000;

// Middleware, um statische Dateien zu servieren (z.B. HTML, CSS, JS)
app.use(express.static('public'));

// Eine GET-Route, um Standortdaten aus der Oracle-Datenbank abzurufen
app.get('/locations', async (req, res) => {
    let connection;

    try {
        // Herstellen einer Verbindung zur Datenbank
        connection = await oracledb.getConnection(dbConfig);

        // SQL-Abfrage ausführen
        const result = await connection.execute(`SELECT * FROM locations`);

        // Das Ergebnis als JSON zurücksenden
        res.json(result.rows);
    } catch (err) {
        // Fehlerhandling
        console.error(err);
        res.status(500).send('Fehler beim Abrufen der Daten');
    } finally {
        // Schließen der Datenbankverbindung
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

// Server starten und auf dem angegebenen Port lauschen
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
