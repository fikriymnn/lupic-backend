const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const useCaseForumSchema = new Schema(
  {
    useCaseId: {
      type: Schema.Types.ObjectId,
      ref: "UseCase",
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = model("UseCaseForum", useCaseForumSchema);
