// models/video_pembelajaran_model.js
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const videoPembelajaranSchema = new Schema(
  {
    judul: { type: String, required: true, trim: true },
    tujuanPembelajaran: { type: String, trim: true },
    deskripsi: { type: String, trim: true },
    linkVideo: { type: String, required: true, trim: true },
    jenjang: { type: String, required: true }, // sebelumnya enum ["SD","SMP"]
    topikIPA: { type: String, required: true }, // sebelumnya enum
    status: { type: String, default: "GRATIS" } // sebelumnya enum ["GRATIS","BERBAYAR"]
  },
  { timestamps: true }
);

// Virtual: relasi ke VideoPembelajaranAccess (one-to-many)
videoPembelajaranSchema.virtual("accesses", {
  ref: "VideoPembelajaranAccess",
  localField: "_id",
  foreignField: "videoId"
});

videoPembelajaranSchema.set("toObject", { virtuals: true });
videoPembelajaranSchema.set("toJSON", { virtuals: true });

module.exports = model("VideoPembelajaran", videoPembelajaranSchema);
