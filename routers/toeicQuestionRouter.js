const router = require("express").Router();

const toeicQuestionController = require("../controllers/toeicQuestionController");

router.get("/", toeicQuestionController.getAllQuestion);

router.get("/:id", toeicQuestionController.getDetailQuestion);

router.post("/", toeicQuestionController.postQuestion);

router.put("/:id", toeicQuestionController.editQuestion);

router.delete("/:id", toeicQuestionController.deleteQuestion);

module.exports = router;
