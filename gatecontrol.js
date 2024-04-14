const mongoose = require('mongoose');
const Gate = require('./connection').models.gate;
const createGate = async (data) => {
  return await Gate.create(data);
};
const getAllGates = async () => {
  return await Gate.find();
};
const getGateById = async (id) => {
  return await Gate.findById(id);
};
const updateGateById = async (id, data) => {
  return await Gate.findByIdAndUpdate(id, data, { new: true });
};
const deleteGateById = async (id) => {
  return await Gate.findByIdAndDelete(id);
};
module.exports = {
  createGate,
  getAllGates,
  getGateById,
  updateGateById,
  deleteGateById
};
