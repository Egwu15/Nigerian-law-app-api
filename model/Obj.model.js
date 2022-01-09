const mongoose = require("mongoose");

const objSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    option_a: {
      type: String,
      required: true,
    },
    option_b: {
      type: String,
      required: true,
    },
    option_c: {
      type: String,
      required: true,
    },
    option_d: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Obj", objSchema);
