const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    module: {
      type: String,
    },
    wps: {
      type: String,
    },
    topic: {
      type: String,
    },
    slides: {
      type: String,
    },
    flashcards: {
      type: String,
    },
    audio: {
      type: String,
    },
    video: {
      type: String,
    },
    text: {
      type: String,
    },
    key: {
      type: String,
    },
    task1: {
      type: String,
    },
    task2: {
      type: String,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
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

let Modules = mongoose.model("Modules", ModuleSchema);

module.exports = Modules;
