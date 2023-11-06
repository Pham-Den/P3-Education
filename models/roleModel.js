const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  autho: [
    {
      type: String,
    },
  ],
});

const Roles = mongoose.model("Roles", roleSchema);

module.exports = Roles;
