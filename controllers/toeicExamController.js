const ToeicExam = require("../models/toeicExamModel");

const toeicExamController = {
  //get all exam
  getAllExam: async (req, res) => {
    try {
      const allExam = await ToeicExam.find();

      return res.status(200).json(allExam);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  //get exam
  getExam: async (req, res) => {
    try {
      const examId = req.params.id;

      const examCurrent = await ToeicExam.findById(examId).populate(
        "questions"
      );

      if (!examCurrent) {
        return res.status(400).json({ message: "Exam Not Found!" });
      }
      console.log(examCurrent);

      return res.status(200).json(examCurrent);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  ///add new exam
  postExam: async (req, res) => {
    try {
      const dataForm = {
        code: req.body.code,
        struc: req.body.struc,
        questions: req.body.questions,
        audio: req.body.audio,
      };

      //valid

      const examCurrent = await ToeicExam.findOne({
        code: req.body.code,
      });
      if (examCurrent) {
        return res.status(400).json({ message: "Exam Is Exists!" });
      }
      //valid ok

      console.log("ok");
      const newExam = new ToeicExam(dataForm);
      const result = await newExam.save();

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //edit exam
  editExam: async (req, res) => {
    try {
      const examId = req.params.id;
      const examCurrent = await ToeicExam.findById(examId);

      if (!examCurrent) {
        return res.status(400).json({ message: "Exam Not Exists!" });
      }

      const dataUpdate = {};
      if (req.body.struc) {
        dataUpdate.struc = req.body.struc;
      }
      if (req.body.audio) {
        dataUpdate.audio = req.body.audio;
      }
      if (req.body.questions) {
        dataUpdate.questions = req.body.questions;
      }
      await examCurrent.updateOne(dataUpdate);

      return res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = toeicExamController;
