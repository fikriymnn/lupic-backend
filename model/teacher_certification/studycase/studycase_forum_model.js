const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const studyCaseForumSchema = new Schema(
  {
    studyCaseId: {
      type: Schema.Types.ObjectId,
      ref: "StudyCase",
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
    },
    name:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

module.exports = model("StudyCaseForum", studyCaseForumSchema);
