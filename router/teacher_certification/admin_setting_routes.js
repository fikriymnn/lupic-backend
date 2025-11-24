const express = require("express");
const router = express.Router();
const adminSettingController = require("../../controllers/teacher_certification/admin_setting_controller");

// Get admin setting
router.get("/admin-setting", adminSettingController.getAdminSetting);

// Update nomor WhatsApp
router.put("/admin-setting/whatsapp", adminSettingController.updateWhatsApp);

// Tambah jenis pembayaran
router.post("/admin-setting/jenis-pembayaran", adminSettingController.addJenisPembayaran);

// Update jenis pembayaran by index
router.put("/admin-setting/jenis-pembayaran/:index", adminSettingController.updateJenisPembayaran);

// Delete jenis pembayaran by index
router.delete("/admin-setting/jenis-pembayaran/:index", adminSettingController.deleteJenisPembayaran);

module.exports = router;