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
    } catch(err) {
        return res.status(500).json(err.message)
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
        const decoded = jwt.verify(token,"jwt-secret-key")
        req.userId = decoded.id;
        next()
    }  catch(err) {
        return res.status(500).json({message: "server error"})
    }
}

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

