const bcrypt = require('bcrypt');
const { createToken } = require('../auth');
const userController = require('../DL/user.controller');
const testService = require('./test.service');

const { errMessage, checkData } = require('../errController');
const { createTest } = require('./test.service');
// const fs = require('fs');
const SALTROUNDS = 10;

const getUser = async (email, proj = undefined, populate) => {
  const user = await userController.readOne({ email }, proj, populate);
  if (!user && !user.isActive) throw errMessage.USER_NOT_FOUND;
  return user;
};

const getUserForRegister = async (email, proj = undefined) => {
  const user = await userController.readOne({ email }, proj);
  if (user) throw errMessage.USER_IS_EXIST;
  return user;
};

const login = async (data) => {
  checkData(data, ['email', 'password']);
  const user = await getUser(data.email, '+password');
  const isEqual = bcrypt.compareSync(data.password, user.password);
  if (!isEqual) throw errMessage.PASSWORDS_ARE_NOT_CORRECT;
  const token = createToken(user.email);
  console.log(token);
  return token;
};

const createUser = async (data) => {
  checkData(data, ['fName', 'lName', 'email', 'password', 'gender']);
  await getUserForRegister(data.email);
  data.password = bcrypt.hashSync(data.password, SALTROUNDS);
  return await userController.create(data);
};

const getUserTests = async (email) => {
  checkData({ email }, ['email']);
  const user = await getUser(email, '+test', 'test');
  return user.test;
};

const getInsights = async (email) => {
  checkData({ email }, ['email']);
  const user = await getUser(email, '+test', 'test');
  const insights = user.test.map(async (singleTest) => {
    return await testService.getInsights(singleTest._id);
  });
  console.log(insights);
  return insights;
};

const deleteUser = async (email) => {
  const user = await getUser(email);
  userController.del({ _id: user._id });
  return true;
};

const addTestToUser = async (email, data) => {
  const user = await getUser(email);
  const test = await createTest(data);
  
const newWordSet = new Set();
data.data
  .filter(chapter => chapter.title === "אנגלית")
  .forEach(chapter => {
    chapter.correct.forEach(ans => newWordSet.add(ans["מילה חדשה"].toLowerCase()));
    chapter.incorrect.forEach(ans => newWordSet.add(ans["מילה חדשה"].toLowerCase()));
  });

const newWord = Array.from(newWordSet);
const vocabulary = newWord.filter(word => !user.vocabulary.includes(word));


  const res = userController.update({ _id: user._id }, { vocabulary: [...user.vocabulary,...vocabulary],$push: { test: test._id} });
  return res;
};

module.exports = {
  login,
  createUser,
  getUserForRegister,
  getUserTests,
  getUser,
  addTestToUser,
  deleteUser,
  getInsights,
};
