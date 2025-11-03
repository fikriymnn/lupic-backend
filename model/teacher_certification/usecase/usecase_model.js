const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const useCaseSchema = new Schema(
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
      type: [String],
      required: true
    },
    pembahasan: {
      type: String
    }
  },
  { timestamps: true }
);

// Virtual: relasi ke UseCaseAnswer (one-to-one)
useCaseSchema.virtual("answer", {
  ref: "UseCaseAnswer",
  localField: "_id",
  foreignField: "useCaseId",
  justOne: true
});

// Virtual: relasi ke UseCaseForum (one-to-many)
useCaseSchema.virtual("forums", {
  ref: "UseCaseForum",
  localField: "_id",
  foreignField: "useCaseId"
});

useCaseSchema.set("toObject", { virtuals: true });
useCaseSchema.set("toJSON", { virtuals: true });

module.exports = model("UseCase", useCaseSchema);
