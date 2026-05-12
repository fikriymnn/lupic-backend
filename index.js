require("dotenv").config();

const express = require('express')
const body_parser = require('body-parser')
const cookie_parser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

const URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 5001

const allowedOrigins = [
  "https://www.lupic.org",
  "https://api.lupic.org",
  "http://localhost:3000",
  "http://localhost:5001",
];

// CORS hanya sekali, di luar start()
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))
app.use(cookie_parser())

async function start() {
  try {
    await mongoose.connect(URL)
    console.log("MongoDB connected")
  } catch (err) {
    console.log("MongoDB error:", err.message)
  }

  app.use("/api", require('./router/router'))
  app.use("/file", express.static(path.join(__dirname, 'file')));

  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.log(err.message)
  }
}

start()
module.exports = app