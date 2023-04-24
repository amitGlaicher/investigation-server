const testData = require('./test.model');

async function create(data) {
  return await testData.create(data);
}
async function read(filter, proj) {
  return await testData.find(filter, proj);
}

async function readOne(filter, proj) {
  let res = await testData.find(filter, proj);
  return res[0];
}

async function update(id, newData) {
  return await testData.findOneAndUpdate(id, newData, { new: true });
}
async function del(id) {
  return await update(id, { isActive: false });
}

module.exports = { create, read, update, del, readOne };
