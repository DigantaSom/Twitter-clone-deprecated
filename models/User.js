const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  handle: { type: String, required: true, unique: true },
  birthday: { type: Date },
  joiningDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', userSchema);
