const mongoose = require("mongoose");

const waitListSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    skill: [
      {
        type: String,
      },
    ],
    caseStudy: [
      {
        type: String,
      },
    ],
    typeStudy: {
      type: String,
      required: true,
    },
    writingContent: {
      type: String,
    },

    srcRef: {
      type: String,
      required: true,
    },

    classCode: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
    isCreateUser: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

let WaitList = mongoose.model("WaitList", waitListSchema);

module.exports = WaitList;
