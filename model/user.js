const mongoose = require('mongoose');

const userSchena = mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String }
});

const User = new mongoose.model('User', userSchena);

module.exports = User;