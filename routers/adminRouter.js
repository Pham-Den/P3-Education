const router = require("express").Router();
const adminController = require("../controllers/adminController");
const userAuthi = require("../middleware/userAuthi");

//reset pass
// router.post("/reset", adminController.resetPassword);

//post
router.post("/add", adminController.postAddManagement);

//edit password
router.post(
  "/edit-password",
  userAuthi(["admin", "mod"]),
  adminController.postEditPassManagement
);

//update info
router.post(
  "/update/info",
  userAuthi(["admin", "mod"]),
  adminController.postUpdateManagement
);
// //update info
// router.post(
//   "/update/case",
//   userAuthi(["admin", "mod"]),
//   adminController.postUpdateManagement
// );

//update info
router.get(
  "/overview-dashboard",
  userAuthi(["admin", "mod"]),
  adminController.getOverviewDashboard
);

module.exports = router;
