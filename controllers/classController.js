const Admins = require("../models/adminModel");
const Classes = require("../models/classModel");
const Users = require("../models/userModel");

const classController = {
  //get all class
  getAllClasses: async (req, res) => {
    try {
      const adminCurrent = await Admins.findById(req.body._id);
      let allClasses = [];

      if (adminCurrent) {
        allClasses = await Classes.find()
          .populate("courses")
          .populate("users")
          .populate("createdBy");
      } else {
        allClasses = await Classes.find({ createdBy: req.body._id })
          .populate("courses")
          .populate("users")
          .populate("createdBy");
      }

      return res.status(200).json(allClasses);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //get a class (role === admin)
  getClasses: async (req, res) => {
    try {
      const classID = req.params.id;
      const classCurrent = await Classes.findById(classID)
        .populate({
          path: "courses",
          populate: "modules",
        })
        .populate("users");

      if (!classCurrent) {
        return res.status(400).json({ message: "Class Not Exists!" });
      }
      res.status(200).json(classCurrent);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //get a class (user)
  getMyClasses: async (req, res) => {
    try {
      const classID = req.params.id;

      //check xem user có nằm trong class không
      const userCurrent = await Users.findById(req.body._id);

      const index = userCurrent.classes.findIndex((d) => d.equals(classID));

      if (index === -1) {
        return res.status(400).json({ message: "User Not In Class!" });
      }

      const classCurrent = await Classes.findById(classID)
        .populate({
          path: "courses",
          populate: "modules",
        })
        .populate("users");

      if (!classCurrent) {
        return res.status(400).json({ message: "Class Not Exists!" });
      }
      res.status(200).json(classCurrent);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //post Class
  postClass: async (req, res) => {
    try {
      const dataClass = {
        code: req.body.code,
        quiz: req.body.quiz,
        classroom: req.body.classroom,
        kickoff: req.body.kickoff,
        fee: req.body.fee,
        note: req.body.note,
        courses: req.body.courses,
        isActived: req.body.isActived == true ? true : false,
        users: req.body.users,
        color: req.body.color,
        background: req.body.background,
        createdBy: req.body._id,
      };

      //valid
      if (!dataClass.code.trim()) {
        return res.status(400).json({ message: "Please Input Classcode!" });
      }
      if (!dataClass.quiz.trim()) {
        return res.status(400).json({ message: "Please Input Quiz!" });
      }
      if (!dataClass.classroom.trim()) {
        return res.status(400).json({ message: "Please Input Classroom!" });
      }
      if (!dataClass.kickoff.trim()) {
        return res.status(400).json({ message: "Please Input Kick Off!" });
      }
      if (!dataClass.fee.trim()) {
        return res.status(400).json({ message: "Please Input Fee!" });
      }

      //find exists
      const classCodeCurrent = await Classes.find({ code: dataClass.code });

      if (classCodeCurrent.length > 0) {
        return res.status(400).json({ message: "Classcode Is Exists!" });
      }

      //valid ok

      const newClass = new Classes(dataClass);
      const classNew = await newClass.save();

      //nếu có user - duyệt từng user và add class vào
      if (dataClass.users.length > 0) {
        dataClass.users.forEach(async (element) => {
          try {
            const userCurrent = await Users.findById(element);
            const index = userCurrent.classes.findIndex(
              (data) => data === classNew._id
            );

            if (index === -1) {
              userCurrent.classes.push(classNew._id);
              await userCurrent.save();
            }
          } catch (err) {
            console.log(err);
          }
        });
      }

      res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //remove class
  deleteClass: async (req, res) => {
    try {
      const id = req.params.id;

      //delete class
      const classCurrent = await Classes.findById(id);

      if (!classCurrent) {
        return res.status(400).json({ message: "Class Not Exists!" });
      }

      //nếu class tồn tại thì xóa
      await Classes.findByIdAndDelete(id);

      //delete class trong user - nếu có mới xóa
      if (classCurrent.users.length > 0) {
        classCurrent.users.forEach(async (element) => {
          try {
            //1.dò từng user - 2.tìm user - 3.xóa class
            const userCurrent = await Users.findById(element);

            //3.xóa class
            const index = userCurrent.classes.findIndex(
              (i) => `"${i}"` === JSON.stringify(classCurrent._id)
            );

            if (index !== -1) {
              userCurrent.classes.splice(index, 1);
              await userCurrent.save();
            }
          } catch (err) {
            console.log(err);
          }
        });
      }

      //phản hồi
      return res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //edit class
  putClass: async (req, res) => {
    try {
      const id = req.params.id;
      const dataUpdate = {
        quiz: req.body.quiz,
        classroom: req.body.classroom,
        kickoff: req.body.kickoff,
        fee: req.body.fee,
        note: req.body.note,
        courses: req.body.courses,
        isActived: req.body.isActived == true ? true : false,
        users: req.body.users,
        color: req.body.color,
        background: req.body.background,
      };

      //valid
      if (!dataUpdate.quiz.trim()) {
        return res.status(400).json({ message: "Please Input Quiz!" });
      }
      if (!dataUpdate.classroom.trim()) {
        return res.status(400).json({ message: "Please Input Classroom!" });
      }
      if (!dataUpdate.kickoff.trim()) {
        return res.status(400).json({ message: "Please Input Kick Off!" });
      }
      if (!dataUpdate.fee.trim()) {
        return res.status(400).json({ message: "Please Input Fee!" });
      }

      //tìm class current
      const classCurrent = await Classes.findById(id);

      if (!classCurrent) {
        return res.status(400).json({ message: "Class Not Exists!" });
      }

      //tìm xoá users cũ có đính class - để tránh lỗi thì tìm hết user
      const allUser = await Users.find({ classes: classCurrent._id });

      if (allUser.length > 0) {
        allUser.forEach(async (user) => {
          const indexClass = user.classes.findIndex(
            (data) => data.toString() === classCurrent._id.toString()
          );
          if (indexClass !== -1) {
            user.classes.splice(indexClass, 1);
            await user.save();
          }
        });
      }

      // nếu có user - duyệt từng user và add class vào user đó - đồng thời update totalTuition;
      dataUpdate.totalTuition = 0;
      if (dataUpdate.users.length > 0) {
        dataUpdate.users.forEach(async (element) => {
          try {
            const userCurrent = await Users.findById(element);
            const index = userCurrent.classes.findIndex(
              (data) => data === classCurrent._id.toString()
            );

            if (index === -1) {
              userCurrent.classes.push(classCurrent._id);
              await userCurrent.save();
            }

            //update totalTuition
            const indexClass = userCurrent.others.findIndex(
              (d) => d.class === classCurrent.code
            );
            if (indexClass !== -1) {
              dataUpdate.totalTuition =
                dataUpdate.totalTuition + userCurrent.others[indexClass].fee;
            }
          } catch (err) {
            console.log(err);
          }
        });
      }

      // update class
      await classCurrent.updateOne(dataUpdate);

      //phản hồi
      return res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //update Attendance
  putAttClass: async (req, res) => {
    try {
      const classID = req.params.id;
      const attendance = req.body.attendance;
      // console.log(classID, attendance);

      const classCurrent = await Classes.findById(classID);
      if (!classCurrent) {
        return res.status(400).json({ message: "Class Not Exists!" });
      }

      classCurrent.attendance = attendance;
      await classCurrent.save();

      return res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //update progress
  putProgressClass: async (req, res) => {
    try {
      const classID = req.params.id;

      //tìm lớp
      const classCurrent = await Classes.findById(classID);
      if (!classCurrent) {
        return res.status(400).json({ message: "Class Not Exists!" });
      }
      //nếu không phải check all thì xử lý đơn
      if (!req.body.checkAll) {
        const data = {
          module: req.body.module,
          isDone: req.body.isDone,
        };

        //có lớp thì thêm tiến độ vào
        //kiểm tra xem có tồn tại chưa
        const index = classCurrent.progress.findIndex(
          (d) => d.module === data.module
        );

        //nếu tồn tại thì sửa
        if (index !== -1) {
          classCurrent.progress[index].isDone = data.isDone;
        } else {
          classCurrent.progress.push(data);
        }

        await classCurrent.save();

        return res.status(200).json({ message: "Successfully!" });
      } else {
        req.body.module.forEach((mod) => {
          const data = {
            //module là mảng
            module: mod.module,
            isDone: req.body.isDone,
          };

          //có lớp thì thêm tiến độ vào
          //kiểm tra xem có tồn tại chưa
          const index = classCurrent.progress.findIndex(
            (d) => d.module === data.module
          );
          //nếu tồn tại thì sửa
          if (index !== -1) {
            classCurrent.progress[index].isDone = data.isDone;
          } else {
            classCurrent.progress.push(data);
          }
        });
        await classCurrent.save();
        return res.status(200).json({ message: "Successfully!" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = classController;
