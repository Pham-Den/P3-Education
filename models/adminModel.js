const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    nickname: {
      type: String,
    },
    avatar: {
      type: String,
    },
    backgroundNavbar: {
      type: String,
    },
    linkMeet: {
      type: String,
    },
    linkCalendar: {
      type: String,
    },
    case: {},
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classes",
      },
    ],
  },
  {
    timestamps: true,
  }
);

let Admins = mongoose.model("Admins", adminSchema);

module.exports = Admins;
