const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const useCaseAnswerSchema = new Schema(
  {
    useCaseId: {
      type: Schema.Types.ObjectId,
      ref: "UseCase",
      required: true,
      unique: true // one-to-one
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("UseCaseAnswer", useCaseAnswerSchema);
