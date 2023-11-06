const router = require("express").Router();
const roleController = require("../controllers/roleController");
const userAuthi = require("../middleware/userAuthi");

// get all role
router.get("/", userAuthi(["admin", "mod"]), roleController.getAllRole);

//add new role
router.post("/", userAuthi(["admin", "mod"]), roleController.postRole);

//put role
router.put("/:id", userAuthi(["admin", "mod"]), roleController.putEditRole);

//remove
router.delete("/:id", userAuthi(["admin", "mod"]), roleController.deleteRole);

module.exports = router;
