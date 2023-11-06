const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      require: true,
    },
    routestudy: {
      type: String,
      require: true,
    },
    price: {
      type: String,
    },
    image: {
      type: String,
    },
    type: {
      type: String,
    },
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Modules",
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

let Courses = mongoose.model("Courses", CourseSchema);

module.exports = Courses;
