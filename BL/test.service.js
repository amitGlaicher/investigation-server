const testController = require('../DL/test.controller');
const chapterService = require('./chapter.service');
const { checkData } = require('../errController');

const getTest = async (filter) => {
  const test = await testController.readOne({ filter });
  return test;
};
const getInsights = async (filter) => {
  const test = await testController.readOne({ filter });
  const insights = test.map((chapter) => {
    return chapterService.getInsights(chapter);
  });
  return insights;
};

const createTest = async (data) => {
  checkData(data, ['simulationName', 'numChapters', 'data']);
  const idsArray = [];
  var incorrect = 0
  var answers = 0
  const insights = []
  for (let chapter in data.data) {
    idsArray.push(await chapterService.createChapter(data.data[chapter]));
    incorrect+=data.data[chapter].correct.length
    answers+=data.data[chapter].correct.length
    answers+=data.data[chapter].incorrect.length
    insights.push(...data.data[chapter].correct.map(ans=>ans['לקח יישומי']))
    insights.push(...data.data[chapter].incorrect.map(ans=>ans['לקח יישומי']))
  }
  const test = {
    name: data.name,
    date: data.date,
    chapters: idsArray,
    numChapters: data.numChapters,
    simulationName:data.simulationName,
    correctAnswer:answers-incorrect,
    sumAnswers:answers,
    insights
  };
  const newTest = await testController.create(test);
  return newTest._id;
};

module.exports = { getTest, createTest, getInsights };
