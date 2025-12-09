const ConferencePapper = require("../model/conference_paper_model");

const conference_papper_controller = {
  get_conference_papper: async (req, res) => {
    try {
      const data = await ConferencePapper.find();
      res.send(data);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  get_conference_papper_by_id: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await ConferencePapper.findById(id);
      if (!data) {
        return res.status(404).json({
          message: "Conference papper not found",
        });
      }
      res.send(data);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  create_conference_papper: async (req, res) => {
    try {
      const { title, description, cover, module } = req.body;
      await ConferencePapper.create({
        title,
        description,
        cover,
        module,
      });
      res.send("success");
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  update_conference_papper: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, cover, module } = req.body;
      const data = await ConferencePapper.findByIdAndUpdate(
        id,
        {
          title,
          description,
          cover,
          module,
        },
        { new: true }
      );
      if (!data) {
        return res.status(404).json({
          message: "Conference papper not found",
        });
      }
      res.send("success");
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  delete_conference_papper: async (req, res) => {
    try {
      const { id } = req.params;
      await ConferencePapper.deleteOne({ _id: id });
      res.send("success");
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  add_module: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, file, cover } = req.body;
      const data = await ConferencePapper.findById(id);
      if (!data) {
        return res.status(404).json({
          message: "Conference papper not found",
        });
      }
      data.module.push({
        title,
        description,
        file,
        cover,
      });
      await data.save();
      res.send("success");
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  update_module: async (req, res) => {
    try {
      const { id, module_id } = req.params;
      const { title, description, file, cover } = req.body;
      const data = await ConferencePapper.findById(id);
      if (!data) {
        return res.status(404).json({
          message: "Conference papper not found",
        });
      }
      const module = data.module.id(module_id);
      if (!module) {
        return res.status(404).json({
          message: "Module not found",
        });
      }
      if (title) module.title = title;
      if (description) module.description = description;
      if (file) module.file = file;
      if (cover) module.cover = cover;
      await data.save();
      res.send("success");
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  delete_module: async (req, res) => {
    try {
      const { id, module_id } = req.params;
      const data = await ConferencePapper.findById(id);
      if (!data) {
        return res.status(404).json({
          message: "Conference papper not found",
        });
      }
      data.module.pull({ _id: module_id });
      await data.save();
      res.send("success");
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
};

module.exports = conference_papper_controller;