const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));  // Serve static files

const db = new sqlite3.Database(':memory:'); // Use SQLite in-memory database for simplicity

// Create the reminders table
db.serialize(() => {
    db.run("CREATE TABLE reminders (id INTEGER PRIMARY KEY, day TEXT, time TEXT)");
});

// Add Reminder
app.post('/addReminder', (req, res) => {
    const { day, time } = req.body;
    db.run("INSERT INTO reminders (day, time) VALUES (?, ?)", [day, time], function(err) {
        if (err) return res.status(500).send(err.message);
        res.json({ id: this.lastID });
    });
});

// Get All Reminders
app.get('/getReminders', (req, res) => {
    db.all("SELECT * FROM reminders", (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

// Edit Reminder
app.put('/editReminder/:id', (req, res) => {
    const { day, time } = req.body;
    db.run("UPDATE reminders SET day = ?, time = ? WHERE id = ?", [day, time, req.params.id], function(err) {
        if (err) return res.status(500).send(err.message);
        res.sendStatus(200);
    });
});

// Delete Reminder
app.delete('/deleteReminder/:id', (req, res) => {
    db.run("DELETE FROM reminders WHERE id = ?", req.params.id, function(err) {
        if (err) return res.status(500).send(err.message);
        res.sendStatus(204);
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
