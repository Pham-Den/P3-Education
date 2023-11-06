const usersController = require("../controllers/userController");
const router = require("express").Router();
const userAuthi = require("../middleware/userAuthi");

//edit user
router.post(
  "/update",
  userAuthi(["user", "mod", "admin"]),
  usersController.updateUser
);

//get My user
router.get(
  "/myuser",
  userAuthi(["admin", "user", "mod"]),
  usersController.getMyUser
);

//update fee - admin
//edit user
router.post(
  "/update-others/:id",
  userAuthi(["mod", "admin"]),
  usersController.feeUpdateUser
);

//edit progress
router.put(
  "/progress",
  userAuthi(["mod", "admin", "user"]),
  usersController.putProgressUser
);

//////////////////////mod///////////////////
//get all mod
router.get("/mod", userAuthi(["admin", "mod"]), usersController.getAllMod);

//get all mod
router.put("/mod/:id", userAuthi(["admin", "mod"]), usersController.putMod);

///////////////////////////////////////////////
//get all user
router.get("/", userAuthi(["admin", "mod"]), usersController.getAllUser);

//get all user
router.get("/:id", userAuthi(["admin", "mod"]), usersController.getUser);

//post user
router.post("/", userAuthi(["admin", "mod"]), usersController.postUser);

//delete user
router.delete("/:id", userAuthi(["admin", "mod"]), usersController.deleteUser);

//edit user
router.put("/:id", userAuthi(["admin", "mod"]), usersController.putUser);

module.exports = router;
