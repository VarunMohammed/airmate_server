const express = require('express');
const router = express.Router();
const userLoginController = require('./project backend/userlogincontrol');

router.post('/', async (req, res) => {
  try {
    const user = await userLoginController.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await userLoginController.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await userLoginController.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const user = await userLoginController.updateUserById(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await userLoginController.deleteUserById(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
