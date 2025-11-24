const mongoose = require("mongoose")
const { model } = mongoose

const AdminSettingSchema = new mongoose.Schema({
    jenis_pembayaran: [{
        type: String,
    }],
    no_whatsapp: {
        type: String,
    },
})

module.exports = model("AdminSetting", AdminSettingSchema)