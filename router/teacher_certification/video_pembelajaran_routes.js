// routes/video_pembelajaran_routes.js
const express = require("express");
const videoPembelajaran = require("../../controllers/teacher_certification/video_pembelajaran_controller");

const router = express.Router();

/* =========================================================
   🎥 VIDEO PEMBELAJARAN CRUD
========================================================= */
router.post("/video_pembelajaran", videoPembelajaran.createVideoPembelajaran);
router.get("/video_pembelajaran", videoPembelajaran.getAllVideoPembelajaran);
router.get("/video_pembelajaran/:id?", videoPembelajaran.getVideoPembelajaranById);
router.put("/video_pembelajaran/:id", videoPembelajaran.updateVideoPembelajaran);
router.delete("/video_pembelajaran/:id", videoPembelajaran.deleteVideoPembelajaran);

/* =========================================================
   🔑 VIDEO PEMBELAJARAN ACCESS CRUD
========================================================= */
router.post("/video_pembelajaran_access", videoPembelajaran.createVideoAccess);
router.get("/video_pembelajaran_access", videoPembelajaran.getAllVideoAccess);
router.get("/video_pembelajaran_access/:videoId", videoPembelajaran.getAccessByVideoId);
router.put("/video_pembelajaran_access/:id", videoPembelajaran.updateVideoAccess);
router.delete("/video_pembelajaran_access/:id", videoPembelajaran.deleteVideoAccess);

module.exports = router;
