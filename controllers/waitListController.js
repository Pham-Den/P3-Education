const WaitList = require("../models/waitListModel");

const waitListController = {
  //get all
  getAllWaitList: async (req, res) => {
    try {
      const allWaitList = await WaitList.find().sort({ createdAt: -1 });

      return res.status(200).json(allWaitList);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  //post WaitList
  postWaitList: async (req, res) => {
    try {
      const data = {
        email: req.body.email,
        name: req.body.name,
        year: req.body.year,
        phone: req.body.phone,
        address: req.body.address,
        reason: req.body.reason,
        skill: req.body.skill,
        writingContent: req.body.writingContent,
        typeStudy: req.body.typeStudy,
        caseStudy: req.body.caseStudy,
        srcRef: req.body.srcRef,
      };

      if (!data.email.trim()) {
        return res.status(400).json({ message: "Please Input Email!" });
      }
      if (!data.name.trim()) {
        return res.status(400).json({ message: "Please Input Name!" });
      }
      if (!data.phone.trim()) {
        return res.status(400).json({ message: "Please Input Phone!" });
      }
      if (!data.address.trim()) {
        return res.status(400).json({ message: "Please Input Address!" });
      }
      if (!data.reason.trim()) {
        return res.status(400).json({ message: "Please Input Reason!" });
      }
      if (data.skill.length === 0) {
        return res.status(400).json({ message: "Please Input Skill!" });
      }
      if (!data.typeStudy.trim()) {
        return res.status(400).json({ message: "Please Input Type Study!" });
      }
      if (data.caseStudy.length === 0) {
        return res.status(400).json({ message: "Please Input Case Study!" });
      }
      if (!data.srcRef.trim()) {
        return res
          .status(400)
          .json({ message: "Please Input Type Ref Sourse!" });
      }

      //valid ok

      const newWaitList = new WaitList(data);
      const waitlistNew = await newWaitList.save();

      res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteWaitList: async (req, res) => {
    try {
      const id = req.params.id;

      //tìm data
      const waitlistCurrent = await WaitList.findById(id);

      if (!waitlistCurrent) {
        return res.status(400).json({ message: "Wait List Not Exists!" });
      }

      await WaitList.findByIdAndDelete(id);

      return res.status(200).json({ message: "Successfully!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  putWaitList: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = waitListController;
