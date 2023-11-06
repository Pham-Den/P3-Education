const mongoose = require("mongoose");

const toeicExamSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    struc: [
      {
        type: Object,
        required: true,
      },
    ],
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ToeicQuestion",
      },
    ],
    audio: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ToeicExam = mongoose.model("ToeicExam", toeicExamSchema);

module.exports = ToeicExam;
