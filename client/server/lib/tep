import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './database.js';
import createAllTable from './lib/dbUtils.js'; // ✅ adjust path if needed
import authRoutes from './routes/authRoutes.js'; // adjust path to your router file


const app = express();
const PORT = process.env.PORT;

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ✅ Create tables at startup
(async () => {
  try {
    await createAllTable();
    console.log("✅ Database tables are ready!");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
    process.exit(1); // stop server if DB is broken
  }
})();

// GET endpoint to fetch all products
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// POST endpoint to add a new product
app.post('/api/products', upload.single('image'), (req, res) => {
  const { name, description, category, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const parsedPrice = parseFloat(price);

  if (isNaN(parsedPrice)) {
    return res.status(400).json({ error: "Invalid price provided." });
  }

  db.query(
    'INSERT INTO products (name, description, category, price, image_url) VALUES (?, ?, ?, ?, ?)',
    [name, description, category, parsedPrice, imageUrl],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId, name, description, category, price: parsedPrice, imageUrl });
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});