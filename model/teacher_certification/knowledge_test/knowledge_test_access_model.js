// models/video_pembelajaran_access_model.js
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const KnowledgeTestAccessSchema = new Schema(
  {
    paket : {
      type:String
    },
    paketId:{
      type:Schema.Types.ObjectId,
      ref: "KnowlageTestPaket",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false
    },
    start_date:{
      type: Date,
      default : Date.now()
    },
    end_date:{
      type: Date,
    },
    nama: { type: String, trim: true },
    email: { type: String, trim: true },
    no_whatsapp: { type: String, trim: true },
    provinsi: { type: String, trim: true },
    jenjang_sekolah: { type: String, trim: true },
    nama_instansi: { type: String, trim: true },
    mata_pelajaran: { type: String, trim: true },
    status_ppg: { type: String, trim: true },
    sumber_informasi: { type: String, trim: true },
    sumber_informasi_lainnya: { type: String, trim: true },
    tanggal_pengisi: { type: Date, default: Date.now },
    bukti_pembayaran: { type: String, trim: true },
    status: { type: String, default: "NO ACCESS" } // sebelumnya enum
  },
  { timestamps: true }
);

module.exports = model("KnowledgeTestAccess", KnowledgeTestAccessSchema);
