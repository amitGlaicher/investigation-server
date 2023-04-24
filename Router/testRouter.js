const express = require('express');
const testRouter = express.Router();
const testService = require('../BL/test.service');
const { sendError } = require('../errController');

testRouter.post('/addtest', async (req, res) => {
  try {
    const newTest = await testService.createTest(req.body);
    res.status(200).send('succeed');
  } catch (err) {
    sendError(res, err);
  }
});

module.exports = { testRouter };
