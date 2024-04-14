const express = require('express');
const router = express.Router();
const classController = require('../project backend/classcontrol');

router.post('/', async (req, res) => {
  try {
    const cabinClass = await classController.createClass(req.body);
    res.status(201).json(cabinClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const classes = await classController.getAllClasses();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cabinClass = await classController.getClassById(req.params.id);
    if (!cabinClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(cabinClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const cabinClass = await classController.updateClassById(req.params.id, req.body);
    res.json(cabinClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await classController.deleteClassById(req.params.id);
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
