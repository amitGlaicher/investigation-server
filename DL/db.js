const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;
async function connect() {
  try {
    await mongoose
      .connect(MONGO_URL||"mongodb+srv://matanel:0526193031@cluster0.x4zq8ri.mongodb.net/psicho?retryWrites=true&w=majority", {
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
