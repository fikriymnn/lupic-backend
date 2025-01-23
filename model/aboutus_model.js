const mongoose = require('mongoose')


const aboutus_schema = new mongoose.Schema({
    gambar: {
        type: String,
        required: true
    },
    nama: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String,
        required: true
    },
    pesan: {
        type: String,
        required: true
    },

},
    { timestamps: true }
)

module.exports = mongoose.model("Aboutus", aboutus_schema)