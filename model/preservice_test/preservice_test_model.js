const mongoose = require("mongoose")
const { model } = mongoose

const PreServiceTestSchema = new mongoose.Schema({
    paketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PreServiceTestPaket",
    },
    kategori: {
        type: String,    //PCK atau SJT
        required: true
    },
    penjelasan: {
        type: String
    },
    soal: [{
        type: {
            type: String,  // TEXT atau IMAGE
            required: true
        },
        value: {
            type: String,  // teks atau nama file
            required: true
        }
    }],
    pilihan: [{
        type: String,
    }],
    jawaban: {
        type: String,
    },
})

module.exports = model("PreServiceTest", PreServiceTestSchema)
