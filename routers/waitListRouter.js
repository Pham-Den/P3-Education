const router = require("express").Router();
const waitListController = require("../controllers/waitListController");
const userAuthi = require("../middleware/userAuthi");

//get all waitList
router.get(
  "/all",
  userAuthi(["admin", "mod"]),
  waitListController.getAllWaitList
);

//post waitList
router.post("/add", waitListController.postWaitList);

//delete waitList
router.delete(
  "/remove/:id",
  userAuthi(["admin", "mod"]),
  waitListController.deleteWaitList
);

//put waitList
router.put(
  "/edit/:id",
  userAuthi(["admin", "mod"]),
  waitListController.putWaitList
);

module.exports = router;
