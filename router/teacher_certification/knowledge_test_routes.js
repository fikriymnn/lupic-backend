const router = require("express").Router();
const knowledgeTest = require("../../controllers/teacher_certification/knowledge_test_controller");


// ==========================================
// 📦 PAKET (CRUD)
// ==========================================
router.post("/paket", knowledgeTest.createPaket);
router.get("/paket", knowledgeTest.getAllPaket);
router.get("/paket/id/:id?", knowledgeTest.getPaketById);
router.put("/paket/:id", knowledgeTest.updatePaket);
router.delete("/paket/:id", knowledgeTest.deletePaket);


// ==========================================
// 📝 SOAL (CRUD)
// ==========================================
router.post("/soal", knowledgeTest.createSoal);
router.get("/soal", knowledgeTest.getAllSoal);
router.get("/soal/gratis", knowledgeTest.getAllSoalGratis);
router.get("/soal/premium/:id", knowledgeTest.getAllSoalPremium);
router.get("/soal/paketid/:id?", knowledgeTest.getSoalByPaketId);
router.get("/soal/id/:id?", knowledgeTest.getSoalById);
router.put("/soal/:id", knowledgeTest.updateSoal);
router.delete("/soal/:id", knowledgeTest.deleteSoal);

// 🔥 GET Soal berdasarkan paket, dan grouping berdasarkan kategori (PCK/SJT)
router.get("/soal/paket/:paketId", knowledgeTest.getSoalByPaketGrouped);


// ==========================================
// 🔐 ACCESS (CRUD)
// ==========================================
router.post("/access", knowledgeTest.createAccess);
router.get("/access", knowledgeTest.getAllAccess);
router.get("/access/id/:id", knowledgeTest.getUserAccess);
router.get("/access/all/id/:id", knowledgeTest.getAllUserAccess);

// GET access berdasarkan userId atau paketId (pakai query ?userId= & ?paketId=)
router.get("/access/filter", knowledgeTest.getAccessByFilter);

router.put("/access/:id", knowledgeTest.updateAccess);
router.delete("/access/:id", knowledgeTest.deleteAccess);


// ==========================================
// 📊 NILAI (CRUD + History)
// ==========================================
router.post("/nilai", knowledgeTest.createNilai);
router.get("/nilai", knowledgeTest.getAllNilai);

// 🔥 GET Riwayat nilai user by userId
router.get("/nilai/history/:userId", knowledgeTest.getHistoryByUser);

router.delete("/nilai/:id", knowledgeTest.deleteNilai);


module.exports = router;
