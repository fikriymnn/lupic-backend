const router = require("express").Router();
const {
  createModulAjar,
  getAllModulAjar,
  getModulAjarById,
  updateModulAjar,
  deleteModulAjar,
  createAccess,
  getAllAccess,
  getAccessByModul,
  updateAccess,
  deleteAccess
} = require("../../controllers/teacher_certification/modul_ajar_controller");

// =============================
// 📘 MODUL AJAR CRUD
// =============================
router.post("/modul_ajar", createModulAjar);
router.get("/modul_ajar/:id?", getModulAjarById);
router.get("/modul_ajar", getAllModulAjar);
router.put("/modul_ajar/:id", updateModulAjar);
router.delete("/modul_ajar/:id", deleteModulAjar);

// =============================
// 🔐 MODUL AJAR ACCESS CRUD
// =============================
router.post("/modul_ajar_access", createAccess);
router.get("/modul_ajar_access", getAllAccess);
router.get("/modul_ajar_access/:modulId", getAccessByModul);
router.put("/modul_ajar_access/:id", updateAccess);
router.delete("/modul_ajar_access/:id", deleteAccess);

module.exports = router;
