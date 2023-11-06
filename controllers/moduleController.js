const Modules = require("../models/moduleModel");
const Admins = require("../models/adminModel");
const Users = require("../models/userModel");

const moduleController = {
  ////////Get All module
  getAllModule: async (req, res) => {
    try {
      const adminCurrent = await Admins.findById(req.body._id);

      let allModules = [];
      if (adminCurrent) {
        allModules = await Modules.find()
          .populate("createdBy")
          .sort({ createdAt: -1 });
      } else {
        allModules = await Modules.find({ createdBy: req.body._id })
          .populate("createdBy")
          .sort({
            createdAt: -1,
          });
      }

      res.status(200).json(allModules);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  ////////Get a module
  getModule: async (req, res) => {
    try {
      const adminCurrent = await Admins.findById(req.body._id);
      let moduleCurrent = "";
      if (adminCurrent) {
        moduleCurrent = await Modules.findById(req.params.id);
        if (!moduleCurrent) {
          return res.status(400).json({ message: "Module Not Exists!" });
        }
      } else {
        moduleCurrent = await Modules.findOne({
          _id: req.params.id,
          createdBy: req.body._id,
        });

        if (!moduleCurrent) {
          return res.status(400).json({ message: "Module Not Yourself!" });
        }
      }

      console.log(moduleCurrent);

      return res.status(200).json(moduleCurrent);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  ////////Post module
  postModule: async (req, res) => {
    try {
      const userId = req.body._id;
      const data = {
        category: req.body.category,
        module: req.body.module,
        topic: req.body.topic,
        wps: req.body.wps,
        slides: req.body.slides,
        flashcards: req.body.flashcards,
        audio: req.body.audio,
        video: req.body.video,
        text: req.body.text,
        key: req.body.key,
        task1: req.body.task1,
        task2: req.body.task2,
        createdBy: userId,
      };

      if (!data.category.trim()) {
        return res.status(400).json({ message: "Please Input Category!" });
      }
      if (!data.module.trim()) {
        return res.status(400).json({ message: "Please Input Module!" });
      }
      if (!data.topic.trim()) {
        return res.status(400).json({ message: "Please Input Topic!" });
      }

      const moduleFind = await Modules.find({ module: data.module });

      if (moduleFind.length > 0) {
        return res.status(400).json({ message: "Module Already Exists!" });
      }

      const moduleNew = new Modules(data);
      const newModule = await moduleNew.save();
      res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete module
  deleteModule: async (req, res) => {
    try {
      const idUser = req.body._id;
      const idModule = req.params.id;
      const adminCurrent = await Admins.findById(idUser);

      if (!idModule.trim()) {
        return res.status(400).json({ message: "Id Module Not Correct!" });
      }

      //tìm xem có id không
      const moduleCurrent = await Modules.findById(idModule);
      if (!moduleCurrent) {
        return res.status(400).json({ message: "Module Not Exists!" });
      }

      if (!adminCurrent && !moduleCurrent.createdBy.equals(idUser)) {
        return res.status(400).json({ message: "Module Not Yourself!" });
      }

      //tìm và xóa data
      await Modules.findByIdAndDelete(idModule);

      return res.status(200).json({ message: "Module is Removed!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //edit module
  putModule: async (req, res) => {
    try {
      const idModule = req.params.id;
      const data = {
        module: req.body.module,
        topic: req.body.topic,
        wps: req.body.wps,
        slides: req.body.slides,
        flashcards: req.body.flashcards,
        audio: req.body.audio,
        video: req.body.video,
        text: req.body.text,
        key: req.body.key,
        task1: req.body.task1,
        task2: req.body.task2,
      };
      if (!idModule.trim()) {
        return res.status(400).json({ message: "Id Module Not Correct!" });
      }

      //tìm xem có id không
      const moduleCurrent = await Modules.findById(idModule);
      if (!moduleCurrent) {
        return res.status(400).json({ message: "Module Not Exists!" });
      }

      //edit data
      await moduleCurrent.updateOne(data);
      res.status(200).json({ message: "Module is Updated!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = moduleController;
