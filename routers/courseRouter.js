const router = require("express").Router();
const courseController = require("../controllers/courseController");
const userAuthi = require("../middleware/userAuthi");

//Get all Course
router.get(
  "/explore",
  // userAuthi(["admin", "user", "mod"]),
  courseController.getAllCoursesNorole
);

//Get all Course
router.get("/", userAuthi(["admin", "mod"]), courseController.getAllCourses);

//Get Course
router.get("/:id", userAuthi(["admin", "mod"]), courseController.getCourses);

//Post new Course
router.post("/", userAuthi(["admin", "mod"]), courseController.postCourse);

//Delete  Course
router.delete(
  "/:id",
  userAuthi(["admin", "mod"]),
  courseController.deleteCourse
);

//Put Course
router.put("/:id", userAuthi(["admin", "mod"]), courseController.putCourse);

module.exports = router;
