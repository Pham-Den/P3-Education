const Roles = require("../models/roleModel");

const roleController = {
  //post new role
  postRole: async (req, res) => {
    try {
      const dataForm = {
        name: req.body.name ? req.body.name.trim() : "",
        autho: req.body.autho ? req.body.autho : [],
      };

      // valid
      if (!dataForm.name) {
        return res.status(400).json({ message: "Please Input Name!" });
      }

      //check xem có role đó chưa
      const roleCurrent = await Roles.findOne({ name: dataForm.name });

      if (roleCurrent) {
        return res.status(400).json({ message: "Role Is Exists!" });
      }

      const role = new Roles(dataForm);
      const newRole = await role.save();
      return res.status(200).json(newRole);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //get all role
  getAllRole: async (req, res) => {
    try {
      const allRole = await Roles.find();

      return res.status(200).json(allRole);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //post Role
  postRole: async (req, res) => {
    try {
      const formData = {
        name: req.body.name ? req.body.name.trim() : "",
        autho: req.body.autho ? req.body.autho : [],
      };
      console.log(formData);

      //valid
      if (!formData.name) {
        return res.status(400).json({ message: "Please Input Role Name!" });
      }

      //tìm xem có role tồn tại chưa
      const roleCurrent = await Roles.findOne({ name: formData.name });
      if (roleCurrent) {
        return res.status(400).json({ message: "Role Is Exists!" });
      }

      const newRole = new Roles(formData);
      await newRole.save();

      return res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //edit Role
  putEditRole: async (req, res) => {
    try {
      console.log(req.params.id);
      const formData = {
        name: req.body.name ? req.body.name.trim() : "",
        autho: req.body.autho ? req.body.autho : [],
      };

      //valid
      if (!formData.name) {
        return res.status(400).json({ message: "Please Input Role Name!" });
      }

      //tìm xem có role tồn tại chưa
      const roleCurrent = await Roles.findById(req.params.id);
      if (!roleCurrent) {
        return res.status(400).json({ message: "Role Not Exists!" });
      }

      await roleCurrent.updateOne({ $set: formData });

      return res
        .status(200)
        .json({ message: "Successfully!", _id: roleCurrent._id });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //remove Role
  deleteRole: async (req, res) => {
    try {
      //tìm xem có role tồn tại chưa
      const roleCurrent = await Roles.findById(req.params.id);
      if (!roleCurrent) {
        return res.status(400).json({ message: "Role Not Exists!" });
      }

      await Roles.findByIdAndDelete(req.params.id);

      return res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = roleController;
