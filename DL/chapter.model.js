const mongoose = require("mongoose");
require("./chapter.model");

const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  correct: {
    type: Array,
  },
  incorrect: {
    type: Array,
  },
});

const chapterData = mongoose.model("chapter", chapterSchema);

module.exports = chapterData;
