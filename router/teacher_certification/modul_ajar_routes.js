const router = require("express").Router();
const modulAjar = require("../../controllers/teacher_certification/modul_ajar_controller");

// =============================
// 📘 MODUL AJAR CRUD
// =============================
router.post("/modul_ajar", modulAjar.createModulAjar);
router.get("/modul_ajar/id/:id?", modulAjar.getModulAjarById);
router.get("/modul_ajar", modulAjar.getAllModulAjar);
router.put("/modul_ajar/:id", modulAjar.updateModulAjar);
router.delete("/modul_ajar/:id", modulAjar.deleteModulAjar);

// =============================
// 🔐 MODUL AJAR ACCESS CRUD
// =============================
router.post("/modul_ajar_access", modulAjar.createAccess);
router.get("/modul_ajar_access", modulAjar.getAllAccess);
router.get("/modul_ajar_access/:modulId", modulAjar.getAccessByModul);
router.put("/modul_ajar_access/:id", modulAjar.updateAccess);
router.delete("/modul_ajar_access/:id", modulAjar.deleteAccess);

module.exports = router;
