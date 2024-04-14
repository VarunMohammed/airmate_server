const { MyModel3 } = require('./connection');

exports.createFlightDetails = async (flightDetailsData) => {
  try {
    const flightDetails = new MyModel3(flightDetailsData);
    await flightDetails.save();
    return flightDetails;
  } catch (error) {
    throw error;
  }
};

exports.getAllFlightDetails = async () => {
  try {
    const flightDetails = await MyModel3.find();
    return flightDetails;
  } catch (error) {
    throw error;
  }
};

exports.getFlightDetailsById = async (id) => {
  try {
    const flightDetails = await MyModel3.findById(id);
    return flightDetails;
  } catch (error) {
    throw error;
  }
};

exports.updateFlightDetailsById = async (id, flightDetailsData) => {
  try {
    const flightDetails = await MyModel3.findByIdAndUpdate(id, flightDetailsData, { new: true });
    return flightDetails;
  } catch (error) {
    throw error;
  }
};

exports.deleteFlightDetailsById = async (id) => {
  try {
    await MyModel3.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
