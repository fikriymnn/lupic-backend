const mongoose = require("mongoose")
const { model } = mongoose

const KnowlageTestHargaSchema = new mongoose.Schema({
    paket: {
        type: Number,  //PAKET 1
        required: true
    },
}, {
    timestamps: true
})

module.exports = model("KnowlageTestHarga", KnowlageTestHargaSchema)