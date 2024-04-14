const mongoose = require('mongoose');
const db = require("./connection");
const flightDetailsSchema = new mongoose.Schema({
  FlightID: { type: Number, required: true, unique: true },
  UserID: { type: Number, required: true },
  FlightNumber: { type: String, required: true },
  DepartureAirport: { type: String, required: true },
  ArrivalAirport: { type: String, required: true },
  DepartureDateTime: { type: Date, required: true },
  ArrivalDateTime: { type: Date, required: true },
});

const FlightDetails = mongoose.model('FlightDetails', flightDetailsSchema);

module.exports = FlightDetails;
