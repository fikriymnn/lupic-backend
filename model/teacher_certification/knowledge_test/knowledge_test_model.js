const mongoose = require("mongoose")
const { model } = mongoose

const KnowlageTestSchema = new mongoose.Schema({
    kategori_soal: {
        type: String,
        required: true
    },
    type_jawaban: {
        type: String,
        required: true
    },
    soal: [
        {
            type: String,
            value: String
        }
    ],
    jawaban: [
        {
            type: String,
            value: String
        }
    ]
})

module.exports = model("KnowlageTest", KnowlageTestSchema)
