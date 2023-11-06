const router = require("express").Router();

const toeicExamController = require("../controllers/toeicExamController");

router.get("/:id", toeicExamController.getExam);

router.get("/", toeicExamController.getAllExam);

router.post("/", toeicExamController.postExam);

router.put("/:id", toeicExamController.editExam);

module.exports = router;
