// routes/productRoutes.js
import express from 'express';
import multer from 'multer';
import db from '../lib/db.js'; // Import the connection pool from the updated db.js

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
    try {
        // Use the pool directly to query the database
        const [results] = await db.query('SELECT * FROM products');
        res.json(results);
    } catch (err) {
        console.error("Error fetching products:", err);
        return res.status(500).json({ error: "Server error" });
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const { name,username, description, category, price } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const parsedPrice = parseFloat(price);

    if (isNaN(parsedPrice)) {
        return res.status(400).json({ error: "Invalid price provided." });
    }

    try {
        // Use the pool directly to insert into the database
        const [results] = await db.query(
            'INSERT INTO products (name,username,description, category, price, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            [name,username,description, category, parsedPrice, imageUrl]
        );
        res.status(201).json({ id: results.insertId, name,username, description, category, price: parsedPrice, imageUrl });
    } catch (err) {
        console.error("Error adding product:", err);
        return res.status(500).json({ error: "Server error" });
    }
});

export default router;
