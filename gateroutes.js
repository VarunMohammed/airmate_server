const express = require('express');
const router = express.Router();
const gateController = require('../project backend/gatecontrol');
router.post('/', async (req, res) => {
  try {
    const gate = await gateController.createGate(req.body);
    res.status(201).json(gate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const gates = await gateController.getAllGates();
    res.json(gates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const gate = await gateController.getGateById(req.params.id);
    if (!gate) {
      return res.status(404).json({ message: 'Gate not found' });
    }
    res.json(gate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const gate = await gateController.updateGateById(req.params.id, req.body);
    res.json(gate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await gateController.deleteGateById(req.params.id);
    res.json({ message: 'Gate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
