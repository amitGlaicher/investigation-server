const chapterData = require('./chapter.model');

async function create(data) {
  return await chapterData.create(data);
}
async function read(filter, proj) {
  return await chapterData.find(filter, proj);
}

async function readOne(filter, proj) {
  let res = await chapterData.find(filter, proj);
  return res[0];
}

async function update(id, newData) {
  return await chapterData.findOneAndUpdate(id, newData, { new: true });
}
async function del(id) {
  return await update(id, { isActive: false });
}

module.exports = { create, read, update, del, readOne };
