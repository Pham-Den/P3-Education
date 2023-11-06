const router = require("express").Router();
const moduleController = require("../controllers/moduleController");
const userAuthi = require("../middleware/userAuthi");

//Get all module
router.get("/", userAuthi(["admin", "mod"]), moduleController.getAllModule);

//Get a module
router.get("/:id", userAuthi(["admin", "mod"]), moduleController.getModule);

//Post new module
router.post("/", userAuthi(["admin", "mod"]), moduleController.postModule);

//Delete module
router.delete(
  "/:id",
  userAuthi(["admin", "mod"]),
  moduleController.deleteModule
);

//Post new module
router.put("/:id", userAuthi(["admin", "mod"]), moduleController.putModule);

module.exports = router;
