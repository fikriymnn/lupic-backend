const Peserta = require('../model/peserta_model');

// Get all peserta
exports.getAllPeserta = async (req, res) => {
    try {
        const { hari, tanggal, bulan, tahun, nama, email } = req.query;
        const filter = {};
        if (hari) filter.hari = { $regex: hari, $options: 'i' }; // Case-insensitive search for hari
        if (tanggal) filter.tanggal = { $regex: tanggal, $options: 'i' }; // Case-insensitive search for tanggal
        if (bulan) filter.bulan = { $regex: bulan, $options: 'i' }; // Case-insensitive search for bulan
        if (tahun) filter.tahun = { $regex: tahun, $options: 'i' }; // Case-insensitive search for tahun
        if (nama) filter.nama = { $regex: nama, $options: 'i' }; // Case-insensitive search for name
        if (email) filter.email = { $regex: email, $options: 'i' }; // Case-insensitive search for email
        const peserta = await Peserta.find(filter);
        res.status(200).json(peserta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get peserta by ID
exports.getPesertaById = async (req, res) => {
    try {
        const peserta = await Peserta.findById(req.params.id);
        if (!peserta) {
            return res.status(404).json({ message: 'Peserta not found' });
        }
        res.status(200).json(peserta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new peserta
exports.createPeserta = async (req, res) => {
    try {
        const peserta = new Peserta(req.body);
        const newPeserta = await peserta.save();
        res.status(201).json(newPeserta);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update peserta by ID
exports.updatePeserta = async (req, res) => {
    try {
        const updatedPeserta = await Peserta.findByIdAndUpdate(req.params.id, req.body);
        if (!updatedPeserta) {
            return res.status(404).json({ message: 'Peserta not found' });
        }
        res.status(200).json(updatedPeserta);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete peserta by ID
exports.deletePeserta = async (req, res) => {
    try {
        const deletedPeserta = await Peserta.findByIdAndDelete(req.params.id);
        if (!deletedPeserta) {
            return res.status(404).json({ message: 'Peserta not found' });
        }
        res.status(200).json({ message: 'Peserta deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get category with dynamic project fields and unique values
exports.getCategory = async (req, res) => {
    try {
        const field = req.query.field; // Expecting a single field name in the query parameter
        if (!field) {
            return res.status(400).json({ message: 'Field query parameter is required' });
        }

        const pipeline = [
            { $group: { _id: `$${field}` } }, // Group by the specified field to get unique values
            { $project: { _id: 0, value: '$_id' } } // Format the output to only include the unique values
        ];

        const result = await Peserta.aggregate(pipeline);
        const uniqueValues = result.map(item => item.value); // Extract the unique values into an array
        res.status(200).json(uniqueValues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};