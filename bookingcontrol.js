const mongoose = require('mongoose');
const PassengerBooking = require('./connection').models.passengerbooking;

const createPassengerBooking = async (data) => {
  return await PassengerBooking.create(data);
};
const getAllPassengerBookings = async () => {
  return await PassengerBooking.find();
};
const getPassengerBooking = async (flightId, userId) => {
  return await PassengerBooking.findOne({ FlightID: flightId, UserID: userId });
};
const updatePassengerBooking = async (flightId, userId, data) => {
  return await PassengerBooking.findOneAndUpdate({ FlightID: flightId ,  UserID: userId }, data, { new: true });
};
const deletePassengerBooking = async (flightId, userId) => {
  return await PassengerBooking.findOneAndDelete({ FlightID: flightId, UserID: userId });
};
module.exports = {
  createPassengerBooking,
  getAllPassengerBookings,
  getPassengerBooking,
  updatePassengerBooking,
  deletePassengerBooking
};
