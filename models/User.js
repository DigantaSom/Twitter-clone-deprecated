const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  handle: { type: String, required: true, unique: true },
  handle_lowercase: { type: String, required: true, unique: true },
  profilePicture: { type: String }, // TODO: put required true here
  birthday: { type: Date },
  joiningDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', userSchema);
