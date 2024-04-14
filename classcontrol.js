const mongoose = require('mongoose');
const CabinClass = require('./connection').models.class;

const createClass = async (data) => {
  return await CabinClass.create(data);
};
const getAllClasses = async () => {
  return await CabinClass.find();
};

const getClassById = async (id) => {
  return await CabinClass.findById(id);
};

const updateClassById = async (id, data) => {
  return await CabinClass.findByIdAndUpdate(id, data, { new: true });
};

const deleteClassById = async (id) => {
  return await CabinClass.findByIdAndDelete(id);
};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClassById,
  deleteClassById
};
