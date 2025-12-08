const PreServiceTestPaket = require("../model/preservice_test/preservice_test_paket_model");
const PreServiceTest = require("../model/preservice_test/preservice_test_model");
const PreServiceTestNilai = require("../model/preservice_test/preservice_test_nilai_model");

const knowledgeTestController = {

  /* ==========================
        🔹 PAKET CONTROLLER
  =========================== */

  // CREATE Paket
  createPaket: async (req, res) => {
    try {
      const paket = await PreServiceTestPaket.create(req.body);
      res.status(201).json(paket);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  // GET ALL Paket
  getAllPaket: async (req, res) => {
    try {
      const paket = await PreServiceTestPaket.find().sort({ createdAt: -1 });
      res.status(200).json(paket);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  // GET Paket by ID
  getPaketById: async (req, res) => {
    try {
      const paket = await PreServiceTestPaket.findById(req.params.id);
      if (!paket) return res.status(404).json({ message: "Paket tidak ditemukan" });
      res.status(200).json(paket);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  // UPDATE Paket
  updatePaket: async (req, res) => {
    try {
      const paket = await PreServiceTestPaket.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(paket);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  // DELETE Paket
  deletePaket: async (req, res) => {
    try {
      await PreServiceTestPaket.findByIdAndDelete(req.params.id);
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
      const soal = await PreServiceTest.create(req.body);
      res.status(201).json(soal);
    } catch (e) {
      console.log(e.message)
      res.status(400).json({ message: e.message });
    }
  },

  // GET ALL Soal
  getAllSoal: async (req, res) => {
    try {
      const soal = await PreServiceTest.find().populate("paketId");
      res.status(200).json(soal);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  // GET ALL Soal Gratis
  getAllSoalGratis: async (req, res) => {
    try {
      const paketGratis = await PreServiceTestPaket.findOne({ status: "GRATIS" })
      if (paketGratis?._id) {
        const soal = await PreServiceTest.find({ paketId: paketGratis._id })
        if (soal) {
          const grouped = soal.reduce((acc, item) => {
            if (!acc[item.kategori]) acc[item.kategori] = [];
            acc[item.kategori].push(item);
            return acc;
          }, {});
          console.log(grouped)
          res.status(200).json(grouped);
        }
      } else {
        res.status(200).send([]);
      }
    } catch (e) {
      console.log(e.message)
      res.status(500).json({ message: e.message });
    }
  },

    // GET ALL Soal Premium
  getAllSoalPremium: async (req, res) => {
    try {
      console.log(req.params.id)
      const paketPremium = await PreServiceTestPaket.findOne({_id:req.params.id})
      console.log(paketPremium)
      if (paketPremium?._id) {
        console.log(paketPremium?._id)
        const soal = await PreServiceTest.find({ paketId: paketPremium._id })
        if (soal) {
          console.log("SOALL")
          console.log(soal)
          const grouped = soal.reduce((acc, item) => {
            if (!acc[item.kategori]) acc[item.kategori] = [];
            acc[item.kategori].push(item);
            return acc;
          }, {});
          console.log(grouped)
          res.status(200).json(grouped);
        }
      } else {
        res.status(200).send([]);
      }
    } catch (e) {
      console.log(e.message)
      res.status(500).json({ message: e.message });
    }
  },

  // GET Soal by ID
  getSoalByPaketId: async (req, res) => {
    try {
      const soal = await PreServiceTest.find({ paketId: req.params.id })
        .populate("paketId");
      if (!soal) return res.status(404).json({ message: "Soal tidak ditemukan" });
      res.status(200).json(soal);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  // GET Soal by ID
  getSoalById: async (req, res) => {
    try {
      const soal = await PreServiceTest.findById(req.params.id)
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
      const soal = await PreServiceTest.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(soal);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  // DELETE Soal
  deleteSoal: async (req, res) => {
    try {
      await PreServiceTest.findByIdAndDelete(req.params.id);
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

      const soal = await PreServiceTest.find({ paketId })
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
        🔹 NILAI CONTROLLER
  =========================== */

  // CREATE Nilai
  createNilai: async (req, res) => {
    try {
      const nilai = await PreServiceTestNilai.create(req.body);
      res.status(201).json(nilai);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  // GET ALL Nilai
  getAllNilai: async (req, res) => {
    try {
      const nilai = await PreServiceTestNilai.find()
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

      const nilai = await PreServiceTestNilai.find({ userId })
        .populate("paketId")
        .sort({ createdAt: -1 });

      res.status(200).json(nilai);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = knowledgeTestController;
