const Courses = require("../models/courseModel");
const Admins = require("../models/adminModel");

const courseController = {
  ////////Get All Course
  getAllCoursesNorole: async (req, res) => {
    try {
      const allCourses = await Courses.find().sort({ createdAt: -1 });

      res.status(200).json(allCourses);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  ////////Get All Course
  getAllCourses: async (req, res) => {
    try {
      const adminCurrent = await Admins.findById(req.body._id);
      let allCourses = [];

      if (adminCurrent) {
        allCourses = await Courses.find()
          .sort({ createdAt: -1 })
          .populate("createdBy")
          .populate({ path: "modules" });
      } else {
        allCourses = await Courses.find({ createdBy: req.body._id })
          .populate("createdBy")
          .populate({ path: "modules" })
          .sort({ createdAt: -1 });
      }

      res.status(200).json(allCourses);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  ////////Get a Course
  getCourses: async (req, res) => {
    try {
      const adminCurrent = await Admins.findById(req.body._id);
      let courseCurrnet = "";
      const idCourse = req.params.id;

      if (adminCurrent) {
        courseCurrnet = await Courses.findById(idCourse).populate("modules");
        if (!courseCurrnet) {
          return res.status(400).json({ message: "Course Not Exists!" });
        }
      } else {
        courseCurrnet = await Courses.findOne({
          _id: idCourse,
          createdBy: req.body._id,
        }).populate("modules");
        if (!courseCurrnet) {
          return res.status(400).json({ message: "Course Not Yourself!" });
        }
      }

      return res.status(200).json(courseCurrnet);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //post new course
  postCourse: async (req, res) => {
    try {
      const dataCourse = {
        code: req.body.code,
        desc: req.body.desc,
        routestudy: req.body.routestudy,
        price: req.body.price,
        image: req.body.image,
        type: req.body.type,
        modules: req.body.modules,
        createdBy: req.body._id,
      };

      //valid data
      if (!dataCourse.code.trim()) {
        return res.status(400).json({ message: "Please Enter Code!" });
      }
      if (!dataCourse.desc.trim()) {
        return res.status(400).json({ message: "Please Enter Description!" });
      }
      if (!dataCourse.routestudy.trim()) {
        return res.status(400).json({ message: "Please Enter Route!" });
      }
      if (!dataCourse.price.trim()) {
        return res.status(400).json({ message: "Please Enter Price!" });
      }
      if (!dataCourse.image.trim()) {
        return res.status(400).json({ message: "Please Enter Image!" });
      }
      if (!dataCourse.type.trim()) {
        return res.status(400).json({ message: "Please Enter Type!" });
      }

      //valid ok

      const codeFind = await Courses.find({ code: dataCourse.code });
      if (codeFind.length > 0) {
        return res.status(400).json({ message: "Code is Existe!" });
      }

      const newCourse = new Courses(dataCourse);
      const courseNew = await newCourse.save();

      res.status(200).json({ message: "Add Course Success!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete course
  deleteCourse: async (req, res) => {
    try {
      const idCourse = req.params.id;
      const idUser = req.body._id;
      const adminCurrent = await Admins.findById(idUser);

      const courseCurrent = await Courses.findById(idCourse);

      if (!courseCurrent) {
        return res.status(400).json({ message: " Course not Found!" });
      }

      if (!adminCurrent && !moduleCurrent.createdBy.equals(idUser)) {
        return res.status(400).json({ message: "Module Not Yourself!" });
      }

      await Courses.findByIdAndDelete(idCourse);
      res.status(200).json({ message: "Remove Course Success!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //put course
  putCourse: async (req, res) => {
    try {
      const dataCourse = {
        desc: req.body.desc,
        routestudy: req.body.routestudy,
        price: req.body.price,
        image: req.body.image,
        type: req.body.type,
        modules: req.body.modules,
      };
      //valid data

      if (!dataCourse.desc.trim()) {
        return res.status(400).json({ message: "Please Enter Description!" });
      }
      if (!dataCourse.routestudy.trim()) {
        return res.status(400).json({ message: "Please Enter Route!" });
      }
      if (!dataCourse.price.trim()) {
        return res.status(400).json({ message: "Please Enter Price!" });
      }
      if (!dataCourse.image.trim()) {
        return res.status(400).json({ message: "Please Enter Image!" });
      }
      if (!dataCourse.type.trim()) {
        return res.status(400).json({ message: "Please Enter Type!" });
      }

      //kiểm tra course id
      const courseCurrent = await Courses.findById(req.params.id);

      if (!courseCurrent) {
        return res.status(400).json({ message: " Course not Found!" });
      }

      await courseCurrent.updateOne(dataCourse);
      res.status(200).json({ message: "Update Course Success!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = courseController;
