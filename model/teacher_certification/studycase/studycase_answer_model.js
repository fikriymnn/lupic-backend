const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const studyCaseAnswerSchema = new Schema(
  {
    studyCaseId: {
      type: Schema.Types.ObjectId,
      ref: "StudyCase",
      required: true,
    },
    userId: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("StudyCaseAnswer", studyCaseAnswerSchema);
