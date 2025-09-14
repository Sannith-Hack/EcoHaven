// lib/db.js
import mysql2 from 'mysql2/promise';

// Create a connection pool. This is more efficient for handling multiple
// concurrent requests than creating a single connection.
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;