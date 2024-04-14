const express = require('express');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

const mongoose = require('mongoose')

dotenv.config({path: "./.env"});
const app = express()
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

app.post('/send-email', (req,res) => {
    const { email, otp } = req.body;

    const mailOptions = {
        from: 'airmate.dev@gmail.com',
        to: email,
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

const userDetailsSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    MiddleName: { type: String },
    LastName: { type: String, required: true },
    Gender: { type: String },
    Email: { type: String },
    Phone: { type: String },
    AadhaarNumber: { type: String },
    PassportNumber: { type: String },
    hasPassport: { type: Boolean, required: true },
    passportCountry: { type: String },
    passportexpirydate: { type: String },
    address: { type: String },
    password: { type: String, required: true, minlength: 8 },
  });
const User = mongoose.model('User', userDetailsSchema);

app.post('/register', async (req, res) => {
    try {
      // Create a new user with data from the request body
      const newUser = new User(req.body);
      // Save the new user to the database
      await newUser.save();
      // Respond with success message and the new user data
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'Login successful', user });
});

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
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User created successfully', user: user });
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