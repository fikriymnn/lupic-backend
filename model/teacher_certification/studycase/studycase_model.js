const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const studyCaseSchema = new Schema(
  {
    judulKasus: {
      type: String,
      required: true,
      trim: true
    },
    deskripsi: {
      type: String,
      trim: true
    },
    status:{
      type: String,
      default: "BERBAYAR"
    },
    jenjang: {
      type: String,
      enum: ["SD", "SMP"],
      required: true
    },
    topikIPA: {
      type: String,
      enum: ["Fisika", "Biologi", "IPA Terpadu"],
      required: true
    },
    kompetensiGuru: {
      type: String,
      enum: ["Pedagogik", "Profesional"],
      required: true
    },
    narasiLengkap: {
      type: String,
      required: true
    },
    pertanyaanAnalisis: {
      type: String,
      required: true
    },
        harga:{
      type:Number,
    },
    pembahasan: {
      type: String
    }
  },
  { timestamps: true }
);


// Virtual: relasi ke StudyCaseForum (one-to-many)
studyCaseSchema.virtual("forums", {
  ref: "StudyCaseForum",
  localField: "_id",
  foreignField: "studyCaseId"
});

studyCaseSchema.set("toObject", { virtuals: true });
studyCaseSchema.set("toJSON", { virtuals: true });

module.exports = model("StudyCase", studyCaseSchema);
