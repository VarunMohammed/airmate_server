const express = require('express');
const router = express.Router();
const userDetailsController = require('./project backend/userdetailscontrol');

router.post('/', async (req, res) => {
  try {
    const userDetails = await userDetailsController.createUserDetails(req.body);
    res.status(201).json(userDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const userDetails = await userDetailsController.getAllUserDetails();
    res.json(userDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userDetails = await userDetailsController.getUserDetailsById(req.params.id);
    if (!userDetails) {
      return res.status(404).json({ message: 'User details not found' });
    }
    res.json(userDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const userDetails = await userDetailsController.updateUserDetailsById(req.params.id, req.body);
    res.json(userDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await userDetailsController.deleteUserDetailsById(req.params.id);
    res.json({ message: 'User details deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
