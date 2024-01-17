const mongoose = require("mongoose");
const URL = process.env.DB;
module.exports = async () => {
  try {
    await mongoose.connect(URL);
    console.log('Connted to mongodb');
  } catch (error) {
    console.log(error.message);
  }
};
