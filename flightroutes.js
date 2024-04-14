const express = require('express');
const router = express.Router();
const flightDetailsController = require('./project backend/flightcontrol');

router.post('/', async (req, res) => {
  try {
    const flightDetails = await flightDetailsController.createFlightDetails(req.body);
    res.status(201).json(flightDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retrieve all flight details
router.get('/', async (req, res) => {
  try {
    const flightDetails = await flightDetailsController.getAllFlightDetails();
    res.json(flightDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retrieve a flight details by ID
router.get('/:id', async (req, res) => {
  try {
    const flightDetails = await flightDetailsController.getFlightDetailsById(req.params.id);
    if (!flightDetails) {
      return res.status(404).json({ message: 'Flight details not found' });
    }
    res.json(flightDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a flight details by ID
router.put('/:id', async (req, res) => {
  try {
    const flightDetails = await flightDetailsController.updateFlightDetailsById(req.params.id, req.body);
    res.json(flightDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a flight details by ID
router.delete('/:id', async (req, res) => {
  try {
    await flightDetailsController.deleteFlightDetailsById(req.params.id);
    res.json({ message: 'Flight details deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

