const Admins = require("../models/adminModel");

const isAdmin = async (id) => {
  try {
    console.log("1");
    const userCurrent = await Admins.findById(id);

    if (!userCurrent) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = isAdmin;
