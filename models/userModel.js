const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    age: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    progress: [{}],
    others: [
      {
        class: {
          type: String,
        },
        fee: { type: String },
        paid: { type: String },
      },
    ],
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
    roles: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roles",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

let Users = mongoose.model("Users", usersSchema);

module.exports = Users;
