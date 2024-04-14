const express = require('express');
const router = express.Router();
const BaggageTracking = require('./connection');


router.post('/add', async (req, res) => {
  try {
    const baggageTracking = new BaggageTracking(req.body);
    await baggageTracking.save();
    res.status(201).json({ message: 'Baggage tracking details added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/all', async (req, res) => {
  try {
    const baggageTracking = await BaggageTracking.find();
    res.json(baggageTracking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
