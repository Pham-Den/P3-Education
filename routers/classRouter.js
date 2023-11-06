const classController = require("../controllers/classController");
const router = require("express").Router();
const userAuthi = require("../middleware/userAuthi");

//get  classes
router.get(
  "/getmyclass/:id",
  userAuthi(["admin", "mod", "user"]),
  classController.getMyClasses
);

//edit  attendance
router.put(
  "/attendance/:id",
  userAuthi(["admin", "mod"]),
  classController.putAttClass
);

//edit  attendance
router.put(
  "/progress/:id",
  userAuthi(["admin", "mod"]),
  classController.putProgressClass
);

////////////////////////////// /////////////////////////////////////

//get all classes
router.get("/", userAuthi(["admin", "mod"]), classController.getAllClasses);

//get  classes
router.get("/:id", userAuthi(["admin", "mod"]), classController.getClasses);

//post class
router.post("/", userAuthi(["admin", "mod"]), classController.postClass);

//Delete  Course
router.delete("/:id", userAuthi(["admin", "mod"]), classController.deleteClass);

//edit  Course
router.put("/:id", userAuthi(["admin", "mod"]), classController.putClass);

module.exports = router;
