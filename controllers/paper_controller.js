const Paper = require("../model/paper_model");

const paper_controller = {
  paper: async (req, res) => {
    try {
      const data = await Paper.find();
      res.send(data);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  create_paper: async (req, res) => {
    try {
      const { cover, judul, file } = req.body;
      await Paper.create({
        cover,
        judul,
        file,
      });
      res.send("success");
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  delete_paper: async (req, res) => {
    try {
      const { id } = req.params;
      await Paper.deleteOne({ _id: id });
      res.send("success");
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
};

module.exports = paper_controller;
