const mongoose = require('mongoose');
require('./test.model');

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
  },
  gender: {
    enum: ['male', 'female'],
    type: String,
  },
  test: [{ type: mongoose.Schema.Types.ObjectId, ref: 'test', select: false }],
  createDate: {
    type: Date,
    default: Date.now,
  },
  vocabulary: {
    type: String,
  },
  permission: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'viewer',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const userData = mongoose.model('user', userSchema);

module.exports = userData;
