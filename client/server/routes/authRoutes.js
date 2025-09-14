import express from 'express'
import {connectToDatabase} from '../lib/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/signup', async (req, res) => {
    const {name, email, password} = req.body;
    console.log(name);
    console.log(email);
    console.log(password);

    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
        if(rows.length > 0) {
            return res.status(409).json({message : "user already existed"})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        await db.query("INSERT INTO users (username, email, password_hash ) VALUES (?, ?, ?)", 
            [name, email,hashPassword])
        
        return res.status(201).json({message: "user created successfully"})
    }  catch (err) {
        console.error("Signup error:", err);   // full error
        return res.status(500).json({ message: "Server error", error: err });
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
        if(rows.length === 0) {
            return res.status(404).json({message : "user not existed"})
        }
        const isMatch = await bcrypt.compare(password, rows[0].password_hash )
        if(!isMatch) {
            return res.status(401).json({message : "wrong password"})
        }
        const token = jwt.sign({id: rows[0].id}, process.env.JWT_KEY, {expiresIn: '3h'})
        
        // Return user ID along with the token
        return res.status(201).json({
            token: token,
            userId: rows[0].id
        })
    } catch(err) {
        return res.status(500).json(err.message)
    }
})
const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if(!token) {
            return res.status(403).json({message: "No Token Provided"})
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id;
        next()
    }  catch(err) {
        return res.status(500).json({message: "server error"})
    }
}

router.put('/update-profile', verifyToken, async (req, res) => {
    const { username, phone, location, bio } = req.body;
    const userId = req.userId;

    try {
        const db = await connectToDatabase();

        // Check if phone already exists for another user
        if (phone) {
            const [rows] = await db.query(
                'SELECT id FROM users WHERE phone = ? AND id != ?',
                [phone, userId]
            );
            if (rows.length > 0) {
                return res.status(409).json({ message: "Phone number already in use" });
            }
        }

        // Update user profile
        await db.query(
            'UPDATE users SET username = ?, phone = ?, location = ?, bio = ? WHERE id = ?',
            [username, phone, location, bio, userId]
        );

        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while updating the profile" });
    }
});


router.get('/home', verifyToken, async (req, res) => {
    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.userId])
        if(rows.length === 0) {
            return res.status(404).json({message : "user not existed"})
        }

        return res.status(201).json({user: rows[0]})
    }catch(err) {
        return res.status(500).json({message: "server error"})
    }
})

export default router;
