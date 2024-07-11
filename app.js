// app.js
const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

// Add a new food entry
app.post("/food", (req, res) => {
    const { foodName, timestamp, notes } = req.body;
    const sql = "INSERT INTO food_entries (food_name, timestamp, notes) VALUES (?, ?, ?)";
    db.query(sql, [foodName, timestamp, notes], (err, result) => {
        if (err) {
            console.error("Error adding food entry:", err);
            res.status(500).json({ error: "Failed to add food entry" });
        } else {
            res.status(201).json({ message: "Food entry added successfully" });
        }
    });
});

// Get all food entries
app.get("/food", (req, res) => {
    const sql = "SELECT * FROM food_entries";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching food entries:", err);
            res.status(500).json({ error: "Failed to fetch food entries" });
        } else {
            res.status(200).json(results);
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
