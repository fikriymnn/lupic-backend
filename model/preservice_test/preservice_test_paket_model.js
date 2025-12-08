const mongoose = require("mongoose")
const { model } = mongoose

const PreServiceTestPaketSchema = new mongoose.Schema({
    paket: {
        type: String,  //PAKET 1
        required: true
    },
    deskripsi : {
        type: String,
    },
    status: {
        type: String, //GRATIS, PREMIUM, HIDE
    },
})

module.exports = model("PreServiceTestPaket", PreServiceTestPaketSchema)