const express = require('express');
const mainRouter = express.Router();
const { userRouter } = require('./userRouter');
const { testRouter } = require('./testRouter');
const { validToken } = require('../auth');

mainRouter.use('/user', userRouter);
mainRouter.use('/test', validToken, testRouter);

module.exports = { mainRouter };
