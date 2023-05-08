const chapterController = require('../DL/chapter.controller');
const { checkData } = require('../errController');

const getChapter = async (id) => {
  const chapter = await chapterController.readOne({ id });
  return chapter;
};
const getInsights = async (id) => {
  const chapter = await chapterController.readOne({ id });
  return [chapter.correct, chapter.incorrect];
};

const createChapter = async (chapter) => {
  checkData(chapter, ['title', 'correct', 'incorrect']);
  const newChapter = await chapterController.create(chapter);
  
  return newChapter._id;
};

module.exports = { getChapter, createChapter, getInsights };
