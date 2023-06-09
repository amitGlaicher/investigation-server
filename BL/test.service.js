const testController = require("../DL/test.controller");
const chapterService = require("./chapter.service");
const { checkData } = require("../errController");

// const getTest = async (filter) => {
//   const test = await testController.readOne({ filter });
//   return test;
// };


//אני הוספתי
const getTest = async (filter,proj = undefined, populate) => {
  const test = await testController.readOne(filter,proj, populate);
  return test;
};


//אני הוספתי כרגע הפונקציה לא עובדת
const getTestOfUser = async (data) => {
  const test =await getTest({_id:data}, `+chapters`,`chapters`)
  console.log(test);
  return test;
}


const getInsights = async (filter) => {
  const test = await testController.readOne({ filter });
  const insights = test.map((chapter) => {
    return chapterService.getInsights(chapter);
  });
  return insights;
};




const createTest = async (data) => {
  checkData(data, ["simulationName", "numChapters", "data"]);
  const idsArray = [];
  var incorrect = 0;
  var answers = 0;
  var insightsCounter = 0;
  const insights = [[], [], []];
  for (let chapter in data.data) {
    switch (data.data[chapter].title) {
      case "כמותי":
        insightsCounter = 0;
        break;
      case "מילולי":
        insightsCounter = 1;
        break;
      case "אנגלית":
        insightsCounter = 2;
        break;
    }
    idsArray.push(await chapterService.createChapter(data.data[chapter]));
    incorrect += data.data[chapter].incorrect.length;
    answers += data.data[chapter].correct.length;
    answers += data.data[chapter].incorrect.length;
    insights[insightsCounter].push(
      ...data.data[chapter].correct.map((ans) => {
        return {
          ins: ans["לקח יישומי"],
          topic: ans["נושא"],
          subtopic: ans["תת נושא"],
        };
      })
    );
    insights[insightsCounter].push(
      ...data.data[chapter].incorrect.map((ans) => {
        return {
          ins: ans["לקח יישומי"],
          topic: ans["נושא"],
          subtopic: ans["תת נושא"],
        };
      })
    );
  }
  const test = {
    name: data.name,
    createDate: data.date,
    chapters: idsArray,
    numChapters: data.numChapters,
    simulationName: data.simulationName,
    correctAnswer: answers - incorrect,
    sumAnswers: answers,
    insights,
  };
  const newTest = await testController.create(test);
  return newTest._id;
};

module.exports = { getTest, createTest, getInsights, getTestOfUser };
