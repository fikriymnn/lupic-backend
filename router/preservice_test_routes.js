const router = require("express").Router();
const knowledgeTest = require("../controllers/preservice_test_controller");


// ==========================================
// 📦 PAKET (CRUD)
// ==========================================
router.post("/preservice/paket", knowledgeTest.createPaket);
router.get("/preservice/paket", knowledgeTest.getAllPaket);
router.get("/preservice/paket/id/:id?", knowledgeTest.getPaketById);
router.put("/preservice/paket/:id", knowledgeTest.updatePaket);
router.delete("/preservice/paket/:id", knowledgeTest.deletePaket);


// ==========================================
// 📝 SOAL (CRUD)
// ==========================================
router.post("/preservice/soal", knowledgeTest.createSoal);
router.get("/preservice/soal", knowledgeTest.getAllSoal);
router.get("/preservice/soal/gratis", knowledgeTest.getAllSoalGratis);
router.get("/preservice/soal/premium/:id", knowledgeTest.getAllSoalPremium);
router.get("/preservice/soal/paketid/:id?", knowledgeTest.getSoalByPaketId);
router.get("/preservice/soal/id/:id?", knowledgeTest.getSoalById);
router.put("/preservice/soal/:id", knowledgeTest.updateSoal);
router.delete("/preservice/soal/:id", knowledgeTest.deleteSoal);

// 🔥 GET Soal berdasarkan paket, dan grouping berdasarkan kategori (PCK/SJT)
router.get("/preservice/soal/paket/:paketId", knowledgeTest.getSoalByPaketGrouped);

// ==========================================
// 📊 NILAI (CRUD + History)
// ==========================================
router.post("/preservice/nilai", knowledgeTest.createNilai);
router.get("/preservice/nilai", knowledgeTest.getAllNilai);

// 🔥 GET Riwayat nilai user by userId
router.get("/preservice/nilai/history/:userId", knowledgeTest.getHistoryByUser);

module.exports = router;
