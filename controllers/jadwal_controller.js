const Jadwal = require('../model/jadwal_model');

// Create a new schedule
exports.createJadwal = async (req, res) => {
    try {
        const jadwal = new Jadwal(req.body);
        const savedJadwal = await jadwal.save();
        res.status(201).json(savedJadwal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all schedules
exports.getAllJadwal = async (req, res) => {
    try {
        const filter = req.query.status ? { status: req.query.status } : {};
        const jadwals = await Jadwal.find(filter);
        res.status(200).json(jadwals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a schedule by ID
exports.updateJadwal = async (req, res) => {
    try {
        const updatedJadwal = await Jadwal.findByIdAndUpdate(req.params.id, req.body);
        if (!updatedJadwal) {
            return res.status(404).json({ message: 'Jadwal not found' });
        }
        res.status(200).json(updatedJadwal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a schedule by ID
exports.deleteJadwal = async (req, res) => {
    try {
        const deletedJadwal = await Jadwal.findByIdAndDelete(req.params.id);
        if (!deletedJadwal) {
            return res.status(404).json({ message: 'Jadwal not found' });
        }
        res.status(200).json({ message: 'Jadwal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};