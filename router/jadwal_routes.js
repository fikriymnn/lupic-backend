const express = require('express');
const JadwalController = require('../controllers/jadwal_controller');

const router = express.Router();

// Define routes for JadwalController
router.get('/jadwal', JadwalController.getAllJadwal);
router.post('/jadwal', JadwalController.createJadwal);
router.put('/jadwal/:id', JadwalController.updateJadwal);
router.delete('/jadwal/:id', JadwalController.deleteJadwal);

module.exports = router;