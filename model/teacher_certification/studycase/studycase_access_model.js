// models/video_pembelajaran_access_model.js
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const StudyCaseAccessSchema = new Schema(
    {
        studyCaseId: {
            type: Schema.Types.ObjectId,
            ref: "StudyCase",
            required: true
        },
        userId: {
             type: Schema.Types.ObjectId,
            ref: "User",
        },
        nama: { type: String, trim: true },
        email: { type: String, trim: true },
        no_whatsapp: { type: String, trim: true },
        provinsi: { type: String, trim: true },
        jenjang_sekolah: { type: String, trim: true },
        nama_instansi: { type: String, trim: true },
        mata_pelajaran: { type: String, trim: true },
        status_ppg: { type: String, trim: true },
        sumber_informasi: [{ type: String, trim: true }],
        sumber_informasi_lainnya: { type: String, trim: true },
        tanggal_pengisi: { type: Date, default: Date.now },
        jenis_pembayaran: { type: String },
        bukti_pembayaran: { type: String, trim: true },
        harga: {
            type: Number,
        },
        status: { type: String, default: "NO ACCESS" } // sebelumnya enum
    },
    { timestamps: true }
);

module.exports = model("StudyCaseAccess", StudyCaseAccessSchema);