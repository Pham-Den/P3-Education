const Users = require("../models/userModel");
const WaitLists = require("../models/waitListModel");
const Classes = require("../models/classModel");
const Roles = require("../models/roleModel");
const Admins = require("../models/adminModel");

const usersController = {
  //get all users
  getAllUser: async (req, res) => {
    try {
      const adminCurrent = await Admins.findById(req.body._id);
      let allUsers = [];
      if (adminCurrent) {
        allUsers = await Users.find()
          .populate("courses")
          .populate("classes")
          .populate("createdBy");
      } else {
        allUsers = await Users.find({ createdBy: req.body._id })
          .populate("courses")
          .populate("classes")
          .populate("createdBy");
      }

      res.status(200).json(allUsers);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //get a user
  getMyUser: async (req, res) => {
    try {
      const userID = req.body._id;
      console.log(userID);

      const userCurrent = await Users.findById(userID)
        .populate({
          path: "classes",
          populate: { path: "courses", populate: "modules" },
        })
        .populate({ path: "courses", populate: "modules" });

      if (!userCurrent) {
        return res.status(400).json({ message: "User Not Exists!" });
      }

      res.status(200).json(userCurrent);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //get a user
  getUser: async (req, res) => {
    try {
      const userID = req.params.id;

      const userCurrent = await Users.findById(userID)
        .populate("courses")
        .populate("classes");

      if (!userCurrent) {
        return res.status(400).json({ message: "User Not Exists!" });
      }

      res.status(200).json(userCurrent);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //post user - admin create
  postUser: async (req, res) => {
    try {
      const dataUser = {
        email: req.body.email,
        password: req.body.password,
        courses: req.body.courses,
        role: req.body.role,
        createdBy: req.body._id,
      };

      //valid
      if (!dataUser.email.trim()) {
        return res.status(400).json({ message: "Please Input Email" });
      } else if (!dataUser.email.includes("@")) {
        return res.status(400).json({ message: "Email Must Include @" });
      }
      if (!dataUser.password.trim()) {
        return res.status(400).json({ message: "Please Input Password" });
      } else if (dataUser.password.length < 8) {
        return res
          .status(400)
          .json({ message: "Password Must Be From 8 words" });
      }
      if (
        !dataUser.role.trim() ||
        (dataUser.role !== "user" &&
          dataUser.role !== "mod" &&
          dataUser.role !== "admin")
      ) {
        return res.status(400).json({ message: "Please Choose Role" });
      }

      //trùng email
      const emailCurrent = await Users.find({ email: dataUser.email });
      if (emailCurrent.length > 0) {
        return res.status(400).json({ message: "Email Is Exists!" });
      }

      //valid ok

      const newUser = new Users(dataUser);
      const userNew = await newUser.save();

      // thêm vào wailist
      const wailistCurrent = await WaitLists.find({ email: dataUser.email });
      if (wailistCurrent.length > 0) {
        wailistCurrent[0].isCreateUser = true;
        await wailistCurrent[0].save();
      }

      res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //remove users
  deleteUser: async (req, res) => {
    try {
      const idUser = req.params.id;

      const userCurrent = await Users.findById(idUser);

      if (!userCurrent) {
        return res.status(400).json({ message: "User Not Found!" });
      }

      await Users.findByIdAndDelete(userCurrent);

      res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //edit users
  putUser: async (req, res) => {
    try {
      const idUser = req.params.id;
      const dataUser = {
        role: req.body.role,
        courses: req.body.courses,
      };

      const userCurrent = await Users.findById(idUser);

      if (!userCurrent) {
        return res.status(400).json({ message: "User Not Found!" });
      }

      if (dataUser.role !== "user" && dataUser.role !== "mod") {
        return res.status(400).json({ message: "Role Is Only User or Mod!" });
      }

      await userCurrent.updateOne(dataUser);

      //xoá roles nếu không là mod
      if (dataUser.role !== "mod") {
        await userCurrent.updateOne({ $unset: { roles: "" } });
      }
      res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //update users
  updateUser: async (req, res) => {
    try {
      const idUser = req.body._id;

      //tìm email
      const userCurrent = await Users.findOne({ email: req.body.email });

      //nếu không có hoặc không khớp email
      if (!userCurrent || !userCurrent._id.equals(idUser)) {
        return res.status(400).json({ message: "Email Not Correct!" });
      }

      //valid data
      const data = {
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        address: req.body.address,
      };

      if (!data.name.trim()) {
        return res.status(400).json({ message: "Please Input Name!" });
      }
      if (!data.age.trim()) {
        return res.status(400).json({ message: "Please Input Age!" });
      }
      if (!data.phone.trim()) {
        return res.status(400).json({ message: "Please Input Phone!" });
      }
      if (!data.address.trim()) {
        return res.status(400).json({ message: "Please Input Address!" });
      }

      //update
      await userCurrent.updateOne(data);
      res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //edit users
  feeUpdateUser: async (req, res) => {
    try {
      const idUser = req.params.id;

      const dataUserOthers = {
        class: req.body.class,
        fee: req.body.fee,
        paid: req.body.paid,
      };

      const userCurrent = await Users.findById(idUser);

      if (!userCurrent) {
        return res.status(400).json({ message: "User Not Found!" });
      }

      const arrayOthers = userCurrent.others;

      //tìm index
      const index = arrayOthers.findIndex(
        (d) => d.class === dataUserOthers.class
      );

      if (index === -1) {
        //thêm vào mảng
        userCurrent.others.push(dataUserOthers);
      } else {
        //sửa mảng
        userCurrent.others[index].fee = req.body.fee;
        userCurrent.others[index].paid = req.body.paid;
      }
      await userCurrent.save();

      //update total fee class
      const classCurrent = await Classes.findOne({
        code: dataUserOthers.class,
      }).populate("users");
      if (!classCurrent) {
        return res.status(400).json({ message: "Class Not Found!" });
      }

      let total = 0;
      classCurrent.users.forEach((user) => {
        const indexC = user.others.findIndex(
          (d) => d.class === classCurrent.code
        );
        if (indexC !== -1) {
          total = Number(total) + Number(user.others[index].fee);
        }
      });
      classCurrent.totalTuition = total;
      await classCurrent.save();

      return res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  putProgressUser: async (req, res) => {
    try {
      const userCurrent = await Users.findById(req.body._id);

      const dataForm = {
        module: req.body.module,
        isDone: req.body.isDone,
      };
      console.log(userCurrent.progress);

      let array = [...userCurrent.progress];
      const index = array.findIndex((d) => d.module === dataForm.module);

      if (index === -1) {
        array.push(dataForm);
      } else {
        array[index] = dataForm;
      }

      await userCurrent.updateOne({ $set: { progress: array } });

      return res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  ///////////////////////////MOD/////////////////////////
  //get all Mod
  getAllMod: async (req, res) => {
    try {
      console.log("ok");
      const allMods = await Users.find({ role: "mod" }).populate("roles");
      console.log(allMods);

      res.status(200).json(allMods);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  ///edit mod
  putMod: async (req, res) => {
    try {
      const idUser = req.params.id;
      const userCurrent = await Users.findById(idUser);

      if (!userCurrent) {
        return res.status(400).json({ message: "Mod Not Found!" });
      }

      if (req.body.roleId) {
        const roleCurrent = await Roles.findById(req.body.roleId);
        if (!roleCurrent) {
          return res.status(400).json({ message: "Role Not Found!" });
        }
        //////ok
        userCurrent.roles = req.body.roleId;
        await userCurrent.save();
      } else {
        await userCurrent.updateOne({ $unset: { roles: "" } });
      }

      res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = usersController;
