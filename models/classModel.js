const mongoose = require("mongoose");

const classesSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    quiz: {
      type: String,
      required: true,
    },
    classroom: {
      type: String,
      required: true,
    },
    kickoff: {
      type: String,
    },
    fee: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    background: {
      type: String,
    },
    note: {
      type: String,
      required: true,
    },
    attendance: {
      type: String,
    },
    isActived: {
      type: Boolean,
    },
    totalTuition: {
      type: Number,
    },
    progress: [
      {
        module: { type: String },
        isDone: { type: Boolean },
      },
    ],
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

let Classes = mongoose.model("Classes", classesSchema);

module.exports = Classes;
