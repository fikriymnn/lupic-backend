const express = require('express');
const pesertaController = require('../controllers/peserta_controller');

const router = express.Router();

// Route to get all participants
router.get('/peserta', pesertaController.getAllPeserta);

// Route to get a participant by ID
router.get('/peserta/:id', pesertaController.getPesertaById);

// Route to create a new participant
router.post('/peserta', pesertaController.createPeserta);

// Route to update a participant by ID
router.put('/peserta/:id', pesertaController.updatePeserta);

// Route to delete a participant by ID
router.delete('/peserta/:id', pesertaController.deletePeserta);

router.get('/category', pesertaController.getCategory);

module.exports = router;