const ModulAjar = require("../../model/teacher_certification/modulajar/modul_ajar_model");
const ModulAjarAccess = require("../../model/teacher_certification/modulajar/modul_ajar_access_model");


const modulAjar = {
  // ✅ Create Modul Ajar
  createModulAjar: async (req, res) => {
    try {
      const modul = await ModulAjar.create(req.body);
      res.status(201).json(modul);
    } catch (error) {
      console.log(error.message)
      res.status(400).json({ message: error.message });
    }
  },

  // ✅ Get All Modul Ajar (with pagination & filter)
  getAllModulAjar: async (req, res) => {
    try {
      const { page = 1, limit = 10, topikIPA, jenjang, search } = req.query;

      const filter = {};
      if (topikIPA) filter.topikIPA = topikIPA;
      if (search) filter.judulModul = { $regex: search, $options: "i" };
      if (jenjang) filter.jenjang = jenjang;

      const total = await ModulAjar.countDocuments(filter);

      const modul = await ModulAjar.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      res.status(200).json({
        data: modul,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // ✅ Get Modul Ajar by ID
  getModulAjarById: async (req, res) => {
    try {
      const modul = await ModulAjar.findById(req.params.id);
      if (!modul) return res.status(404).json({ message: "Modul tidak ditemukan" });
      res.status(200).json(modul);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // ✅ Update Modul Ajar
  updateModulAjar: async (req, res) => {
    console.log("modul ajar")
    try {
      const modul = await ModulAjar.findByIdAndUpdate(req.params.id, req.body,{new:true});
      res.status(200).json(modul);
    } catch (error) {
      console.log(error.message)
      res.status(400).json({ message: error.message });
    }
  },

  // ✅ Delete Modul Ajar
  deleteModulAjar: async (req, res) => {
    try {
      await ModulAjar.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Modul ajar berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  /* ==========================
     MODUL AJAR ACCESS CONTROLLERS
  ============================= */

  // ✅ Create Access
  createAccess: async (req, res) => {
    try {
      const access = await ModulAjarAccess.create(req.body);
      res.status(201).json(access);
    } catch (error) {
      console.log(error.message)
      res.status(400).json({ message: error.message });
    }
  },

  // ✅ Get All Access (populate modul ajar)
  getAllAccess: async (req, res) => {
    try {
      const accessList = await ModulAjarAccess.find()
        .populate("modulAjar").populate("user")
        .sort({ createdAt: -1 });

      res.status(200).json(accessList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // ✅ Get Access by Modul Ajar
  getAccessByModul: async (req, res) => {
    try {
      const {modulId} = req.params
      const {userId} = req.query
      let obj = {modulAjarId : modulId}
      if(userId) obj.userId = userId
      const accessList = await ModulAjarAccess.find(obj)
        .populate("modulAjarId").populate("userId");
      res.status(200).json(accessList);
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ message: error.message });
    }
  },

  // ✅ Update Access
  updateAccess: async (req, res) => {
    try {
      const access = await ModulAjarAccess.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(access);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // ✅ Delete Access
  deleteAccess: async (req, res) => {
    try {
      await ModulAjarAccess.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Access data berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
}

module.exports = modulAjar

