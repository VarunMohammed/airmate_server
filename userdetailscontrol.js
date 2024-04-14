const { MyModel2 } = require('./connection');

exports.createUserDetails = async (userDetailsData) => {
  try {
    const userDetails = new MyModel2(userDetailsData);
    await userDetails.save();
    return userDetails;
  } catch (error) {
    throw error;
  }
};

exports.getAllUserDetails = async () => {
  try {
    const userDetails = await MyModel2.find();
    return userDetails;
  } catch (error) {
    throw error;
  }
};

exports.getUserDetailsById = async (id) => {
  try {
    const userDetails = await MyModel2.findById(id);
    return userDetails;
  } catch (error) {
    throw error;
  }
};

exports.updateUserDetailsById = async (id, userDetailsData) => {
  try {
    const userDetails = await MyModel2.findByIdAndUpdate(id, userDetailsData, { new: true });
    return userDetails;
  } catch (error) {
    throw error;
  }
};

exports.deleteUserDetailsById = async (id) => {
  try {
    await MyModel2.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
