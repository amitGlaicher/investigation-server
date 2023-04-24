const mongoose = require('mongoose');


const testSchema = new mongoose.Schema({
  simulatonName: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
  },
  numChpters: {
    type: Number,
    required: true,
  },
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'chapter' }],
});

const testData = mongoose.model('test', testSchema);

module.exports = testData;