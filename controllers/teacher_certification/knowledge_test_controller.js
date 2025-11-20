const KnowlageTestPaket = require("../../model/teacher_certification/knowledge_test/knowledge_test_paket_model");
const KnowlageTest = require("../../model/teacher_certification/knowledge_test/knowledge_test_model");
const KnowledgeTestAccess = require("../../model/teacher_certification/knowledge_test/knowledge_test_access_model");
const KnowledgeTestNilai = require("../../model/teacher_certification/knowledge_test/knowledge_test_nilai_model");

const knowledgeTestController = {

  /* ==========================
        🔹 PAKET CONTROLLER
  =========================== */

  // CREATE Paket
  createPaket: async (req, res) => {
    try {
      const paket = await KnowlageTestPaket.create(req.body);
      res.status(201).json(paket);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  // GET ALL Paket
  getAllPaket: async (req, res) => {
    try {
      const paket = await KnowlageTestPaket.find().sort({ createdAt: -1 });
      res.status(200).json(paket);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  // GET Paket by ID
  getPaketById: async (req, res) => {
    try {
      const paket = await KnowlageTestPaket.findById(req.params.id);
      if (!paket) return res.status(404).json({ message: "Paket tidak ditemukan" });
      res.status(200).json(paket);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  // UPDATE Paket
  updatePaket: async (req, res) => {
    try {
      const paket = await KnowlageTestPaket.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(paket);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  // DELETE Paket
  deletePaket: async (req, res) => {
    try {
      await KnowlageTestPaket.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Paket berhasil dihapus" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },


  /* ==========================
        🔹 SOAL CONTROLLER
  =========================== */

  // CREATE Soal
  createSoal: async (req, res) => {
    try {
      const soal = await KnowlageTest.create(req.body);
      res.status(201).json(soal);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  // GET ALL Soal
  getAllSoal: async (req, res) => {
    try {
      const soal = await KnowlageTest.find().populate("paketId");
      res.status(200).json(soal);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  // GET Soal by ID
  getSoalById: async (req, res) => {
    try {
      const soal = await KnowlageTest.findById(req.params.id)
        .populate("paketId");
      if (!soal) return res.status(404).json({ message: "Soal tidak ditemukan" });
      res.status(200).json(soal);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  // UPDATE Soal
  updateSoal: async (req, res) => {
    try {
      const soal = await KnowlageTest.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(soal);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  // DELETE Soal
  deleteSoal: async (req, res) => {
    try {
      await KnowlageTest.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Soal berhasil dihapus" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  /* =====================================================
        🔹 GET Soal by Paket → Group by kategori (PCK/SJT)
     ===================================================== */
  getSoalByPaketGrouped: async (req, res) => {
    try {
      const { paketId } = req.params;

      const soal = await KnowlageTest.find({ paketId })
        .sort({ createdAt: -1 });

      const grouped = soal.reduce((acc, item) => {
        if (!acc[item.kategori]) acc[item.kategori] = [];
        acc[item.kategori].push(item);
        return acc;
      }, {});

      res.status(200).json(grouped);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },


  /* ==========================
        🔹 ACCESS CONTROLLER
  =========================== */

  // CREATE Access
  createAccess: async (req, res) => {
    try {
      const access = await KnowledgeTestAccess.create(req.body);
      res.status(201).json(access);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  // GET ALL Access
  getAllAccess: async (req, res) => {
    try {
      const access = await KnowledgeTestAccess.find()
        .populate("paketId")
        .populate("userId")
        .sort({ createdAt: -1 });

      res.status(200).json(access);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  // GET Access by User or Paket
  getAccessByFilter: async (req, res) => {
    try {
      const { userId, paketId } = req.query;

      let filter = {};
      if (userId) filter.userId = userId;
      if (paketId) filter.paketId = paketId;

      const access = await KnowledgeTestAccess.find(filter)
        .populate("paketId")
        .populate("userId");

      res.status(200).json(access);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  // UPDATE Access
  updateAccess: async (req, res) => {
    try {
      const access = await KnowledgeTestAccess.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(access);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  // DELETE Access
  deleteAccess: async (req, res) => {
    try {
      await KnowledgeTestAccess.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Access berhasil dihapus" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },


  /* ==========================
        🔹 NILAI CONTROLLER
  =========================== */

  // CREATE Nilai
  createNilai: async (req, res) => {
    try {
      const nilai = await KnowledgeTestNilai.create(req.body);
      res.status(201).json(nilai);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  // GET ALL Nilai
  getAllNilai: async (req, res) => {
    try {
      const nilai = await KnowledgeTestNilai.find()
        .populate("paketId")
        .populate("userId")
        .sort({ createdAt: -1 });

      res.status(200).json(nilai);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  // GET History nilai by userId
  getHistoryByUser: async (req, res) => {
    try {
      const { userId } = req.params;

      const nilai = await KnowledgeTestNilai.find({ userId })
        .populate("paketId")
        .sort({ createdAt: -1 });

      res.status(200).json(nilai);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  // DELETE Nilai
  deleteNilai: async (req, res) => {
    try {
      await KnowledgeTestNilai.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Nilai berhasil dihapus" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

};

module.exports = knowledgeTestController;
