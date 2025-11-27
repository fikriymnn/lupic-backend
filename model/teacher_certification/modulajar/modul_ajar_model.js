const mongoose = require("mongoose");
const { model } = mongoose;

const ModulAjarSchema = new mongoose.Schema(
  {
    judulModul: {
      type: String,
      required: true,
      trim: true,
    },
    cover: {
      type: String,
      trim: true
    },
    deskripsi: {
      type: String,
      required: true,
    },
    jenjang: {
      type: String,
      enum: ["SD", "SMP"],
      required: true,
    },
    topikIPA: {
      type: String,
      enum: ["Fisika", "Biologi", "IPA Terpadu"],
      required: true,
    },
    tujuanPembelajaran: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["GRATIS", "BERBAYAR"],
      default: "GRATIS",
    },
    file: {
      type: String, // URL atau path file
      required: false,
    },
    harga:{
      type:Number,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("ModulAjar", ModulAjarSchema);
