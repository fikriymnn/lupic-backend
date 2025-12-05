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
    partnerBanner: {
        gambar : String
    },
    partner: [{
        nama: String,
        logo: String,
        deskripsi: String
    }],
    collaboration: [{
        nama: String,
        gambar: String
    }]
},
    { timestamps: true }
)

module.exports = mongoose.model("Aboutus", aboutus_schema)