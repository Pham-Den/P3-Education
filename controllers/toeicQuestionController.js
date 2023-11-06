const ToeicQuestion = require("../models/toeicQuestionModel");

const toeicQuestionController = {
  //get detail question
  getDetailQuestion: async (req, res) => {
    try {
      //valid
      const questionCurrent = await ToeicQuestion.findById(req.params.id);

      return res.status(200).json(questionCurrent);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  ///add new question
  getAllQuestion: async (req, res) => {
    try {
      //valid
      const allQuestion = await ToeicQuestion.find();

      return res.status(200).json(allQuestion);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  ///add new question
  postQuestion: async (req, res) => {
    try {
      if (!req.body.exam.trim()) {
        return res.status(400).json({ message: "Please Input Exam Code!" });
      }
      if (!req.body.part.trim()) {
        return res.status(400).json({ message: "Please Input Part!" });
      }
      if (!req.body.number.trim()) {
        return res.status(400).json({ message: "Please Input Number!" });
      }
      if (!req.body.question.trim()) {
        return res.status(400).json({ message: "Please Input Question!" });
      }
      if (!req.body.a.trim()) {
        return res.status(400).json({ message: "Please Input Answer A!" });
      }
      if (!req.body.b.trim()) {
        return res.status(400).json({ message: "Please Input Answer B!" });
      }
      if (!req.body.c.trim()) {
        return res.status(400).json({ message: "Please Input Answer C!" });
      }
      const dataForm = {
        exam: req.body.exam,
        part: req.body.part,
        number: req.body.number,
        question: req.body.question,
        a: req.body.a,
        b: req.body.b,
        c: req.body.c,
        d: req.body.d,
        img: req.body.img,
        correct: req.body.correct,
        note: req.body.note,
        timeStart: req.body.timeStart,
      };

      //valid

      const questionCurrent = await ToeicQuestion.findOne({
        number: req.body.number,
        exam: req.body.exam,
      });
      if (questionCurrent) {
        return res.status(400).json({ message: "Question Is Exists!" });
      }
      //valid ok

      const newQuestion = new ToeicQuestion(dataForm);
      const result = await newQuestion.save();

      return res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //edit
  editQuestion: async (req, res) => {
    try {
      const questionCurrent = await ToeicQuestion.findById(req.params.id);
      if (!questionCurrent) {
        return res.status(400).json({ message: "Question Not Exists!" });
      }

      /////
      const questionD = await ToeicQuestion.findOne({
        number: req.body.number,
        exam: req.body.exam,
      });
      if (questionD && !questionD._id.equals(req.params.id)) {
        return res.status(400).json({ message: "Number Is Exists!" });
      }

      if (!req.body.part.trim()) {
        return res.status(400).json({ message: "Please Input Part!" });
      }
      if (!req.body.question.trim()) {
        return res.status(400).json({ message: "Please Input Question!" });
      }
      if (!req.body.a.trim()) {
        return res.status(400).json({ message: "Please Input Answer A!" });
      }
      if (!req.body.b.trim()) {
        return res.status(400).json({ message: "Please Input Answer B!" });
      }
      if (!req.body.c.trim()) {
        return res.status(400).json({ message: "Please Input Answer C!" });
      }

      const dataForm = {
        // exam: req.body.exam,
        part: req.body.part,
        number: req.body.number,
        question: req.body.question,
        a: req.body.a,
        b: req.body.b,
        c: req.body.c,
        d: req.body.d,
        img: req.body.img,
        correct: req.body.correct,
        note: req.body.note,
        timeStart: req.body.timeStart,
      };

      //valid

      //valid ok

      await questionCurrent.updateOne(dataForm);

      return res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //delete
  deleteQuestion: async (req, res) => {
    try {
      const questionCurrent = await ToeicQuestion.findById(req.params.id);

      if (!questionCurrent) {
        return res.status(400).json({ message: "Question Not Found!" });
      }

      console.log(questionCurrent);

      await ToeicQuestion.findByIdAndDelete(req.params.id);

      ////xóa luôn trong bộ đề

      return res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = toeicQuestionController;
