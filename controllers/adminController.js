const Admins = require("../models/adminModel");
const Users = require("../models/userModel");
const Classes = require("../models/classModel");

const bcrypt = require("bcryptjs");

const adminController = {
  //reset password
  // resetPassword: async (req, res) => {
  //   try {
  //     const passwordHash = await bcrypt.hash(req.body.email, 10);

  //     const userCurrent = await Users.findOne({ email: req.body.email });
  //     await userCurrent.updateOne({ password: passwordHash });

  //     return res.status(200).json({ message: "Successfully!" });
  //   } catch (err) {
  //     return res.status(500).json(err);
  //   }
  // },

  //post
  postAddManagement: async (req, res) => {
    try {
      const passwordHash = await bcrypt.hash(req.body.password, 10);

      const data = {
        email: req.body.email,
        password: passwordHash,
        role: req.body.role,
      };
      console.log(data);

      //valid

      //add new
      const adminNew = new Admins(data);
      const newAdmin = await adminNew.save();

      //response
      res.status(200).json(newAdmin);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //edit password admin
  postEditPassManagement: async (req, res) => {
    try {
      const data = {
        passwordCurrent: req.body.passwordCurrent,
        passwordNew: req.body.passwordNew,
      };

      //valid

      if (!data.passwordCurrent.trim()) {
        return res
          .status(400)
          .json({ message: "Please Input Password Current!" });
      }
      if (!data.passwordNew.trim() || data.passwordNew.length < 8) {
        return res
          .status(400)
          .json({ message: "Please Input New Password Correct!" });
      }

      //so sánh với pass cũ
      //tìm user theo id
      const userCurrent = await Admins.findById(req.body._id);

      const isCompare = await bcrypt.compare(
        data.passwordCurrent,
        userCurrent.password
      );
      //so sánh pass
      if (!isCompare) {
        return res
          .status(400)
          .json({ message: "Password Current Not Correct!" });
      }
      //ok thì update pass
      const newPassHash = await bcrypt.hash(data.passwordNew, 10);
      userCurrent.password = newPassHash;
      const userCurrentUpdate = await userCurrent.save();

      //response
      res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update info admin
  postUpdateManagement: async (req, res) => {
    try {
      // const data = {
      //   name: req.body.name,
      //   nickname: req.body.nickname,
      // };

      const data = {};

      if (req.body.name) {
        data.name = req.body.name;
      }
      if (req.body.nickname) {
        data.nickname = req.body.nickname;
      }
      if (req.body.linkMeet) {
        data.linkMeet = req.body.linkMeet;
      }
      if (req.body.linkCalendar) {
        data.linkCalendar = req.body.linkCalendar;
      }
      if (req.body.ca1) {
        const { _id, ...Rest } = req.body;
        data.case = Rest;
      }
      //valid
      //tìm user theo id
      let userCurrent = await Admins.findById(req.body._id);
      if (!userCurrent) {
        userCurrent = await Users.findById(req.body._id);
      }

      //ok thì update
      await userCurrent.updateOne({ $set: data });
      const userCurrentUpdate = await userCurrent.save();

      // //response
      // console.log(userCurrentUpdate);
      res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //////overview
  getOverviewDashboard: async (req, res) => {
    try {
      //tổng user
      const adminCurrent = await Admins.findById(req.body._id);
      let allUser = [];
      let allClassActived = [];
      if (adminCurrent) {
        allUser = await Users.find().populate("others");
        allClassActived = await Classes.find({ isActived: true }).populate(
          "users"
        );
      } else {
        allUser = await Users.find({ createdBy: req.body._id }).populate(
          "others"
        );
        allClassActived = await Classes.find({
          isActived: true,
          createdBy: req.body._id,
        }).populate("users");
      }

      const totalUser = allUser.length;

      //tổng doanh thu = user * phí (class active)

      let totalRevenue = 0;

      allClassActived.forEach((currentClass) => {
        currentClass.users.forEach((user) => {
          const index1 = user.others.findIndex(
            (da) => da.class === currentClass.code
          );
          if (index1 !== -1) {
            totalRevenue = totalRevenue + Number(user.others[index1].fee);
          }
        });
      });

      //tổng doanh thu hiện tại (class có att vào buổi 1)
      const allClassActivedFilter1 = allClassActived.filter(
        (d) => Number(d.attendance) % 8 === 1 && d.attendance > 0
      );
      let totalCurrentRevenue = 0;
      allClassActivedFilter1.forEach((currentClass) => {
        currentClass.users.forEach((user) => {
          const index1 = user.others.findIndex(
            (da) => da.class === currentClass.code
          );
          if (index1 !== -1) {
            totalCurrentRevenue =
              totalCurrentRevenue + Number(user.others[index1].fee);
          }
        });
      });

      //tổng thực thu (- user not pay)
      let CurrentRevenu = 0;
      allClassActivedFilter1.forEach((currentClass) => {
        currentClass.users.forEach((user) => {
          const index1 = user.others.findIndex(
            (da) => da.class === currentClass.code && da.paid == "true"
          );
          if (index1 !== -1) {
            CurrentRevenu = CurrentRevenu + Number(user.others[index1].fee);
          }
        });
      });

      const dataResponse = {
        totalUser,
        totalRevenue,
        totalCurrentRevenue,
        CurrentRevenu,
      };
      return res.status(200).json(dataResponse);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = adminController;
