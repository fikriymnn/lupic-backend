const mongoose = require("mongoose");

const paper_schema = new mongoose.Schema(
  {
    cover: {
      type: String,
    },
    judul: {
      type: String,
    },
    file: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Paper", paper_schema);
