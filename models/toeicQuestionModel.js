const mongoose = require("mongoose");

const toeicQuestionSchema = new mongoose.Schema(
  {
    exam: {
      type: String,
      required: true,
    },
    part: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    a: {
      type: String,
    },
    b: {
      type: String,
    },
    c: {
      type: String,
    },
    d: {
      type: String,
    },
    img: {
      type: String,
    },
    correct: {
      type: String,
    },
    note: {
      type: String,
    },
    timeStart: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ToeicQuestion = mongoose.model("ToeicQuestion", toeicQuestionSchema);

module.exports = ToeicQuestion;
