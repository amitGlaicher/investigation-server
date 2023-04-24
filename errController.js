const errModel = (code, message) => {
  return { code: code, message: message };
};

const errMessage = Object.freeze({
  USER_NOT_FOUND: errModel(400, 'user not found'),
  MISSING_DATA: errModel(400, 'missing data'),
  PASSWORDS_ARE_NOT_EQUAL: errModel(401, 'passwords do not match'),
  PASSWORDS_ARE_NOT_CORRECT: errModel(401, 'email or password does not match'),
  CAN_NOT_CREATE_TOKEN: errModel(501, 'try again later'),
  TRY_AGAIN: errModel(999, 'try again'),
  UNAUTHORIZED: errModel(401, 'unauthorized'),
});

const checkData = (data, parameters) => {
  parameters.forEach((parameter) => {
    if (!data[parameter]) throw errMessage.MISSING_DATA;
    console.log(parameter);
  });
};

const sendError = (res, err) => {
  console.log(err.message);
  res.status(err.code || 999).send(err.message || 'try again later');
};

module.exports = { errMessage, checkData, sendError };
