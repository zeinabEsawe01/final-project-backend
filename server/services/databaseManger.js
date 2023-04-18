const mongoose = require("mongoose");
require("dotenv").config();
const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://zeinabesawe:QFdtBcTkC89kIIK2@cluster0.1a30kmx.mongodb.net/final-project?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { connect };
