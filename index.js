const express = require('express')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const mongoose = require('mongoose')
const User = require('./user')

dotenv.config({path: "./.env"});
const app = express()
const port = 8080

mongoose.connect(`mongodb+srv://airmatedev:airmate.dev@airmate.dplynfb.mongodb.net/?retryWrites=true&w=majority&appName=airmate`)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once('open', () => {
    console.log('Connected to MongoDB');
})

app.use(bodyParser.json());

app.post('/register', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const fullname = req.body.fullname;

    const user = await User.findOne({ username });
    if (user) {
        res.status(409).json({ error: 'User already exists' });
    } else {
        const newUser = new User({ username, password, fullname });
        await newUser.save();
        res.status(201).json({ success: true });
    }
});

app.post('/login', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username });
    if (user) {
        res.status(200).json({ success: true, password: user.password });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

/*
app.post('/forgot', (req, res) => {
  const emailId = req.query.email;
  //search if a mail  is present or not
  let query = `SELECT * FROM users WHERE email='${emailId}'`;
  pool.query(query ,(err, result)=>{
      if(result != 0){
          //send email to the received mailid with a random generated 5 digit code and store the code with emailid in the otp table
          //var randomPassword=Math.random().toString(36).substring(8)+'@#$%';//generating the new password
          const userOTP = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
          var nodemailer = require('nodemailer') ;
          
          var transporter = nodemailer.createTransport({
              service:'gmail',
              auth:{
                  user:"airmate.dev@gmail.com",
                  pass:"airmate.dev@123"
              }
          });

          var mailOptions={
              from : 'airmate.dev@gmail.com',
              to : emailId,
              subject : "Your AirMate Password Reset Code!",
              text : `This is your code :\n ${userOTP}\n\nThank you for using our services.\n\nBest Regards.`
          }

          console.log("Mail options are ",mailOptions);
          transporter.sendMail(mailOptions,(error,info)=> {
            if(error) {
                res.status(500).send(`Error: ${error}`);
            } else {
                res.status(200).json({userOTP});
            }
          });
          
      }else{
          res.end("Email Id not found");
      }
  });  
  if (emailId && emailId === validEmail) {
    // Email matches, return status code 200
    res.status(200).json({ message: 'Email is valid' });
  } else {
    // Email doesn't match, return status code 400
    res.status(400).json({ error: 'Invalid email' });
  }
});
*/

app.post('/forgot', (req, res) => {
    const emailId = req.query.email;
    const validEmail = "airmate.dev@gmail.com";
    //search if a mail  is present or not
    if (emailId && emailId === validEmail) {
      // Email matches, return status code 200
      res.status(200).json({ message: 'Email is valid' });
    } else {
      // Email doesn't match, return status code 400
      res.status(400).json({ error: 'Invalid email' });
    }
  });

app.post('/get-hash', (req,res) => {
    const { password } = req.body;

    bcrypt.hash(password, 10, (err, hashedValue) => {
        if(err) {
            print('Error:',err);
            res.status(500).json({ err });
        } else {
            res.json({ hashedValue });
        }
    })
})

app.post('/update-password', (req,res) => {
    const { username,newPassword } = req.body;

    if(!username || !newPassword) {
        res.status(400).json({ error : "Please provide both a username and new password"});
    }

    const sql = 'UPDATE  users SET password = ? WHERE username = ?';
    db.query(sql, [newPassword, username], (err, result) => {
        if(err) {
            return res.status(500).json({error: 'Internal Server Error'});
        }

        if(result.affectedRows === 0) {
            return res.status(404).json({error:'No user found with that username.'});
        }

        res.status(200).json({message: 'Password updated'});
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})