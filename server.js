const express = require('express');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');

dotenv.config({path: "./.env"});
const app = express();
const port = 1337

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'airmate.dev@gmail.com',
        pass: 'bpzv zxdk uaxw dmnd'
    }
});

mongoose.connect(`mongodb+srv://airmatedev:airmate.dev@airmate.dplynfb.mongodb.net/?retryWrites=true&w=majority&appName=airmate`)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once('open', () => {
    console.log('Connected to MongoDB');
})

app.use(express.json()); 
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
       const user = await User.findOne({ email });
       if (!user) {
         return res.status(400).json({ message: 'User not found' });
       }
       const isMatch = await user.comparePassword(password);
       if (!isMatch) {
         return res.status(400).json({ message: 'Invalid credentials' });
       }
       const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
       res.json({ token });
    } catch (error) {
       res.status(500).json({ message: 'Server error' });
    }
});

router.post('/register', async (req, res) => {
    const { firstName, middleName, lastName, gender, email, phone, aadhaarNumber, hasPassport, passportNumber, passportCountry, passportExpiryDate, address, password } = req.body;
   
    try {
       let user = await User.findOne({ email });
       if (user) {
         return res.status(400).json({ message: 'User already exists' });
       }
   
       user = new User({
         firstName,
         middleName,
         lastName,
         gender,
         email,
         phone,
         aadhaarNumber,
         hasPassport,
         passportNumber,
         passportCountry,
         passportExpiryDate,
         address,
         password,
       });
   
       await user.save();
   
       res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
       console.error(error.message);
       res.status(500).json({ message: 'Server error' });
    }
});