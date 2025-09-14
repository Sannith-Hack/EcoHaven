// C:\Users\Admin\Desktop\ECO\client\server\index.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import createAllTable from './lib/dbUtils.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js'; // ✅ Import the new product router

<<<<<<< HEAD
const app = express()
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT"]
}))
const PORT = process.env.PORT || 3000;
=======

const app = express();
const PORT = process.env.PORT;
>>>>>>> f4166b0a8760816cd273e47d9e80f7cea9536716

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes); // ✅ Use the new product router under a specific path
app.get('/', (req, res) => {
    console.log("req.body")
})
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

(async () => {
  try {
    await createAllTable();
    console.log("✅ Database tables are ready!");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
    process.exit(1);
  }
})();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});