const mongoose = require('mongoose')


const activity_carousel_schema = new mongoose.Schema({
    gambar: {
        type: String,
        required: true
    },
    judul: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String,
        required: true
    },

},
    { timestamps: true }
)

module.exports = mongoose.model("Activity_carousel", activity_carousel_schema)