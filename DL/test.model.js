const mongoose = require('mongoose');
require('./chapter.model')

const testSchema = new mongoose.Schema({
  simulationName: {
    type: String,
    required: true,
  },
  createDate: {
    // type: Date,
    type: String,

  },
  numChapters: {
    type: Number,
    required: true,
  },
  correctAnswer: {type: Number,},
  sumAnswers: {type: Number,},
  insights:[],
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'chapter' }],
});

const testData = mongoose.model('test', testSchema);

module.exports = testData;
