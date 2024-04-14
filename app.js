const express = require('express');
const { connectDB, defineSchemasAndModels } = require('./connection');  
const userLoginController = require('./project backend/userlogincontrol');
const userDetailsController = require('./project backend/userdetailscontrol');
const flightDetailsController = require('./project backend/flightcontrol');
const baggageController = require('./project backend/baggagecontrol');
const gateController = require('./project backend/gatecontrol');
const cabinClassController = require('./project backend/classcontrol');
const passengerBookingController = require('./project backend/bookingcontrol');

const app = express();
const mongoose = require('mongoose');
const uri = 'mongodb+srv://airmatedev:airmate.dev@airmate.dplynfb.mongodb.net/test?retryWrites=true&w=majority&appName=airmate';

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
defineSchemasAndModels();
app.use(express.json());

const userDetailsSchema = new mongoose.Schema({
  UserID: { type: Number, required: true, unique: true },
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

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);
app.use(express.json());

app.post('/api/register', async (req, res) => {
  try {
    const newUser = new UserDetails(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
});

app.use('/api/userlogin', userLoginController);
app.use('/api/userdetails', userDetailsController);
app.use('/api/flightdetails', flightDetailsController);
app.use('/api/baggage', baggageController);
app.use('/api/gate', gateController);
app.use('/api/cabinClass', cabinClassController);
app.use('/api/passengerBooking', passengerBookingController);

const PORT = process.env.PORT || 1337;
app.listen(PORT, () =>
{
  console.log(`Server started on port ${PORT}`);
});
