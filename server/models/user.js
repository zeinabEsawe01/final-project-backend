const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'group'}],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'group'}],
});

const User = mongoose.model('User', userSchema);

module.exports = User;