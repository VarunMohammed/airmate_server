const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
   firstName: { type: String, required: true },
   middleName: { type: String },
   lastName: { type: String, required: true },
   gender: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   phone: { type: String, required: true },
   aadhaarNumber: { type: String, required: true, unique: true },
   hasPassport: { type: Boolean, required: true },
   passportNumber: { type: String },
   passportCountry: { type: String },
   passportExpiryDate: { type: String },
   address: { type: String, required: true },
   password: { type: String, required: true },
  });
  
  UserSchema.pre('save', async function(next) {
   if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
   }
   next();
  });

UserSchema.methods.comparePassword = function(candidatePassword) {
 return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);