// init-db.js
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) {
        console.error("Error connecting to database:", err);
    } else {
        console.log("Connected to database!");
        // Execute the CREATE TABLE statement
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS food_entries (
                id INT AUTO_INCREMENT PRIMARY KEY,
                food_name VARCHAR(255) NOT NULL,
                timestamp DATETIME NOT NULL,
                notes TEXT
            );
        `;

        db.query(createTableQuery, (createErr, result) => {
            if (createErr) {
                console.error("Error creating table:", createErr);
            } else {
                console.log("Table created successfully!");
            }
        });
    }
});
