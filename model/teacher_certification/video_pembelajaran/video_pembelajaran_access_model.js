// models/video_pembelajaran_access_model.js
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const videoPembelajaranAccessSchema = new Schema(
  {
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "VideoPembelajaran",
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false
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
    bukti_pembayaran: { type: String, trim: true },
    status: { type: String, default: "NO ACCESS" } // sebelumnya enum
  },
  { timestamps: true }
);

module.exports = model("VideoPembelajaranAccess", videoPembelajaranAccessSchema);
