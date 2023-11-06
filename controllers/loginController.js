const Users = require("../models/userModel");
const Admins = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const bcrypt = require("bcrypt");

const loginController = {
  //Login
  postLogin: async (req, res) => {
    try {
      const dataUser = {
        email: req.body.email,
        password: req.body.password,
      };

      //check valid
      if (!dataUser.email.trim()) {
        return res.status(400).json({ message: "Please Input Email!" });
      }
      if (!dataUser.password.trim()) {
        return res.status(400).json({ message: "Please Input Password!" });
      }

      //tìm xem có email không
      let userCurrent;
      userCurrent = await Admins.findOne({
        email: dataUser.email,
      })
        .populate({ path: "classes" })
        .populate({ path: "courses" });

      //data admin không có thì tìm trong user
      if (!userCurrent) {
        userCurrent = await Users.findOne({
          email: dataUser.email,
        })
          .populate({ path: "classes" })
          .populate({ path: "courses" })
          .populate({ path: "roles" });
      }

      if (!userCurrent) {
        return res.status(400).json({ message: "Email Not Exists!" });
      }
      //email có, so sánh password
      const isCompare = bcrypt.compare(dataUser.password, userCurrent.password);
      if (!isCompare) {
        return res.status(400).json({ message: "Password Not Correct!" });
      }

      const { password, courses, classes, email, role, ...Rest } =
        userCurrent._doc;
      //ok thì
      const jwt_token = jwt.sign(
        {
          _id: userCurrent._id,
          email: userCurrent.email,
          role: userCurrent.role,
          roles: userCurrent.roles,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: 60 * 60 * 2,
        }
      );
      res.status(200).json({ user: Rest, jwt_token: jwt_token });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Register - tự user register
  postRegister: async (req, res) => {
    try {
      const dataUser = {
        email: req.body.email,
        password: req.body.password,
        repeatpassword: req.body.repeatpassword,
        role: "user",
      };

      //check valid
      if (!dataUser.email.trim()) {
        return res.status(400).json({ message: "Please Input Email!" });
      }
      //check valid
      if (!dataUser.email.includes("@")) {
        return res.status(400).json({ message: "Email must be include @!" });
      }
      if (!dataUser.password.trim()) {
        return res.status(400).json({ message: "Please Input Password!" });
      }
      if (dataUser.password !== dataUser.repeatpassword) {
        return res.status(400).json({ message: "Re-Password not match!" });
      }
      if (dataUser.password.length < 8) {
        return res
          .status(400)
          .json({ message: "Password must be from 8 words!" });
      }

      //tìm xem có email không
      let userCurrent;
      userCurrent = await Users.findOne({
        email: dataUser.email,
      });
      if (userCurrent) {
        return res.status(400).json({ message: "Email is Exists!" });
      }

      //băm pass
      const passwordHash = await bcrypt.hash(req.body.password, 10);
      dataUser.password = passwordHash;

      //valid ok
      const newAcc = new Users(dataUser);
      const accNew = newAcc.save();

      res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = loginController;
