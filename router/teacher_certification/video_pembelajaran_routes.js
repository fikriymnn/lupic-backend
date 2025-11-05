// routes/video_pembelajaran_routes.js
const express = require("express");
const {
  createVideoPembelajaran,
  getAllVideoPembelajaran,
  getVideoPembelajaranById,
  updateVideoPembelajaran,
  deleteVideoPembelajaran,
  createVideoAccess,
  getAllVideoAccess,
  getAccessByVideoId,
  updateVideoAccess,
  deleteVideoAccess
} = require("../../controllers/teacher_certification/video_pembelajaran_controller");

const router = express.Router();

/* =========================================================
   🎥 VIDEO PEMBELAJARAN CRUD
========================================================= */
router.post("/video_pembelajaran", createVideoPembelajaran);
router.get("/video_pembelajaran/:id?", getVideoPembelajaranById);
router.get("/video_pembelajaran", getAllVideoPembelajaran);
router.put("/video_pembelajaran/:id", updateVideoPembelajaran);
router.delete("/video_pembelajaran/:id", deleteVideoPembelajaran);

/* =========================================================
   🔑 VIDEO PEMBELAJARAN ACCESS CRUD
========================================================= */
router.post("/video_pembelajaran_access", createVideoAccess);
router.get("/video_pembelajaran_access", getAllVideoAccess);
router.get("/video_pembelajaran_access/:videoId", getAccessByVideoId);
router.put("/video_pembelajaran_access/:id", updateVideoAccess);
router.delete("/video_pembelajaran_access/:id", deleteVideoAccess);

module.exports = router;
