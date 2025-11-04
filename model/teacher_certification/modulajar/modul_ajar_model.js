import mongoose from "mongoose";

const ModulAjarSchema = new mongoose.Schema(
  {
    judulModul: {
      type: String,
      required: true,
      trim: true,
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ModulAjar", ModulAjarSchema);
