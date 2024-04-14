const { MyModel } = require('./connection');

exports.createUser = async (userData) => {
  try {
    const user = new MyModel(userData);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};
exports.getAllUsers = async () => {
  try {
    const users = await MyModel.find();
    return users;
  } catch (error) {
    throw error;
  }
};
exports.getUserById = async (id) => {
  try {
    const user = await MyModel.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

exports.updateUserById = async (id, userData) => {
  try {
    const user = await MyModel.findByIdAndUpdate(id, userData, { new: true });
    return user;
  } catch (error) {
    throw error;
  }
};

exports.deleteUserById = async (id) => {
  try {
    await MyModel.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
