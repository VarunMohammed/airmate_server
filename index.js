const express = require('express')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');

const mongoose = require('mongoose')
const User = require('./user')

dotenv.config({path: "./.env"});
const app = express()
const port = 8080

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

app.use(bodyParser.json());   

app.post('/send-email', (req,res) => {
    const randomNum = Math.floor(Math.random() * 100000);
    const otp = String(randomNum).padStart(5, '0');

    const mailOptions = {
        from: 'airmate.dev@gmail.com',
        to: 'varunmohammed2002@gmail.com',
        subject: `${otp} : AirMate Password Reset OTP`,
        text: `OTP to reset AirMate password is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error,info) => {
        if(error) {
            console.log(error);
            res.status(500).send('Error sending mail' + error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully').body(otp);
        }
    })
})

app.post('/', (req, res) => {
    res.status(200).json({ message: 'Hello' });
})

app.post('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.post('/user/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

app.post('/user/:username', async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    res.json(user);
});

app.post('/user', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
});

app.delete('/user/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
});

app.put('/user/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(user);
});

app.post('/register', async (req,res) => {
    const { email, password } = req.body;

    const params = {
        ClientId: process.env.CLIENT_ID,
        Password: password,
        Username: email,
        UserAttributes: [
            {
                Name: 'email',
                Value: email
            }
        ]
    };

    try {
        await CognitoIdentity.signUp(params).promise();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
        if (err.code === "UsernameExistsException") {
            res.status(409).json({ message: 'User already exists' });
        } else {
            res.status(500).json({ message: `Failed to register user: ${err}` });
        }
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email, password });
    if(user) {
        res.status(200).json({ message: 'User logged in successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.post('/forgotpassword', async (req,res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if(user) {
        //User Exist
    } else {
        //Failed 
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})