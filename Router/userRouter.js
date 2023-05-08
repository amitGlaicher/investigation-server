const express = require('express');
const { validToken } = require('../auth');
const userRouter = express.Router();
const userService = require('../BL/user.service');
const { sendError } = require('../errController');
// const multer = require('multer');
/**
 * @swagger
 * tags:
 *  name: user
 * /api/user/login:
 *  post:
 *    tags: [user]
 *    description: Use to login need to send email and password
 *    parameters:
 *      - name: user
 *        in: body
 *        description: The user object
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              format: email
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: In a successful response return token
 *        content:
 *           application/json:
 *             schema:
 *               type: string
 *      '400':
 *        description: bad request
 *        content:
 *           application/json:
 *             schema:
 *               type: string
 */
userRouter.post('/login', async (req, res) => {
  try {
    const token = await userService.login(req.body);
    const user = await userService.getUser(
      req.body.email,
      '+test',
      'test.chapter'
    );
    res.send({ token, user });
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * @swagger
 * tags:
 *  name: user
 * /api/user/register:
 *  post:
 *    tags: [user]
 *    description: Use to create a new user
 *    parameters:
 *      - name: user
 *        in: body
 *        description: The user object
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              format: email
 *            fName:
 *              type: string
 *            lName:
 *              type: string
 *            firstPassword:
 *              type: string
 *            secondPassword:
 *              type: string
 *    responses:
 *      '200':
 *        description: In a successful response return token
 *        content:
 *           application/json:
 *             schema:
 *               type: string
 *      '400':
 *        description: missing data
 *        content:
 *           application/json:
 *             schema:
 *               type: string
 */
userRouter.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const user = await userService.createUser(
      req.body,
      req.protocol + '://' + req.headers.host
    );
    res.send(user);
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * @swagger
 * tags:
 *  name: user
 * /api/user/:
 *  get:
 *    tags: [user]
 *    description: Use to get user information
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        description: JWT token for authentication
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: In a successful response return user information
 *      '401':
 *        description: token isn't exists
 *      '400':
 *        description: user not authorized
 */
userRouter.get('/', validToken, async (req, res) => {
  try {
    const user = await userService.getUser(req.email, '+test', 'test'); //לבדוק!!
    res.status(200).send(user);
  } catch (err) {
    sendError(res, err);
  }
});

userRouter.get('/insights', validToken, async (req, res) => {
  try {
    const insights = await userService.getInsights(req.email);
    res.status(200).send(insights);
  } catch (err) {
    sendError(res, err);
  }
});

userRouter.put('/addtest', validToken, async (req, res) => {
  try {
    console.log(req.body);
    const test = await userService.addTestToUser(req.email, req.body);
    res.status(200).send(test);
  } catch (err) {
    sendError(res, err);
  }
});

module.exports = { userRouter };
