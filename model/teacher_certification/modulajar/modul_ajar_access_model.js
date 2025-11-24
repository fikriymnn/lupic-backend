const mongoose = require("mongoose");
const { model } = mongoose;

const ModulAjarAccessSchema = new mongoose.Schema(
  {
    modulAjarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ModulAjar", // relasi ke modul ajar
      required: true,
    },
    userId: {
      type: String
    },
    status: {
      type: String,
      enum: ["ACCESS", "NO ACCESS"],
      default: "NO ACCESS",
    },
    nama: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    no_whatsapp: {
      type: String,
      required: true,
    },
    provinsi: {
      type: String,
      required: true,
    },
    jenjang_sekolah: {
      type: String,
      required: true,
    },
    nama_instansi: {
      type: String,
      required: true,
    },
    mata_pelajaran: {
      type: String,
      required: true,
    },
    status_ppg: {
      type: String,
      required: false,
    },
    sumber_informasi: [{
      type: String,
      required: true,
    }],
    sumber_informasi_lainnya: {
      type: String,
      required: false,
    },
    tanggal_pengisi: {
      type: Date,
      default: Date.now,
    },
    jenis_pembayaran: {type:String},
    bukti_pembayaran: {
      type: String, // bisa URL atau path file bukti
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("ModulAjarAccess", ModulAjarAccessSchema);
