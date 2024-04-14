const express = require('express');
const router = express.Router();
const passengerBookingController = require('../project backend/bookingcontrol');

router.post('/', async (req, res) => {
  try {
    const booking = await passengerBookingController.createPassengerBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const bookings = await passengerBookingController.getAllPassengerBookings();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:flightId/:userId', async (req, res) => {
  try {
    const booking = await passengerBookingController.getPassengerBooking(req.params.flightId, req.params.userId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:flightId/:userId', async (req, res) => {
  try {
    const booking = await passengerBookingController.updatePassengerBooking(req.params.flightId, req.params.userId, req.body);
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete('/:flightId/:userId', async (req, res) => {
  try {
    await passengerBookingController.deletePassengerBooking(req.params.flightId, req.params.userId);
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
