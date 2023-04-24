const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;
async function connect() {
  try {
    mongoose
      .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('connection');
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { connect };
