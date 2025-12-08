// models/video_pembelajaran_access_model.js
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PreServiceTestNilaiSchema = new Schema(
    {
        nilai: {
            benar: Number,
            salah: Number,
            tidak_terjawab: Number,
            nilai: Number
        },
        timeSpent: {
            type:Number
        },
        jumlah_soal: {
            type: Number
        },
        paketId: {
            type: Schema.Types.ObjectId,
            ref: "KnowlageTestPaket",
            required: false
        },
        paket:{
            type:String
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false
        },
        nama: { type: String, trim: true },
        email: { type: String, trim: true },
        no_whatsapp: { type: String, trim: true },
    },
    { timestamps: true }
);

module.exports = model("PreServiceTestNilai", PreServiceTestNilaiSchema);
