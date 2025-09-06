const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session
app.use(session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true
}));

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",      // change if needed
    password: "kali",      // your MySQL password
    database: "testing"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// Register Route
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.send("Missing fields");

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query("INSERT INTO users (username, password) VALUES (?, ?)", 
        [username, hashedPassword], 
        (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.send("Username already exists");
                }
                return res.status(500).send(err);
            }
            res.send("User registered successfully");
        }
    );
});

// Login Route
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.send("User not found");

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            req.session.user = user;
            res.send("Login successful");
        } else {
            res.send("Invalid credentials");
        }
    });
});

// Dashboard (protected route)
app.get("/dashboard", (req, res) => {
    if (req.session.user) {
        res.send(`Welcome ${req.session.user.username}`);
    } else {
        res.send("Please login first");
    }
});

// Logout
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send(err);
        res.send("Logged out");
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
module.exports = app;
