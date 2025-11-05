// controllers/video_pembelajaran_controller.js
const VideoPembelajaran = require("../../model/teacher_certification/video_pembelajaran/video_pembelajaran_model");
const VideoPembelajaranAccess = require("../../model/teacher_certification/video_pembelajaran/video_pembelajaran_access_model");

/* =========================================================
   🎥 VIDEO PEMBELAJARAN CONTROLLERS
========================================================= */

// ✅ Create Video Pembelajaran
exports.createVideoPembelajaran = async (req, res) => {
  try {
    const video = await VideoPembelajaran.create(req.body);
    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get All Video Pembelajaran (dengan filter & pagination)
exports.getAllVideoPembelajaran = async (req, res) => {
  try {
    const { page = 1, limit = 10, topikIPA, jenjang } = req.query;

    const filter = {};
    if (topikIPA) filter.topikIPA = topikIPA;
    if (jenjang) filter.jenjang = jenjang;

    const total = await VideoPembelajaran.countDocuments(filter);

    const videos = await VideoPembelajaran.find(filter)
      .populate("accesses")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      data: videos,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Video Pembelajaran by ID
exports.getVideoPembelajaranById = async (req, res) => {
  try {
    const video = await VideoPembelajaran.findById(req.params.id).populate("accesses");
    if (!video) return res.status(404).json({ message: "Video pembelajaran tidak ditemukan" });
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Video Pembelajaran
exports.updateVideoPembelajaran = async (req, res) => {
  try {
    const video = await VideoPembelajaran.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) return res.status(404).json({ message: "Video tidak ditemukan" });
    res.status(200).json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete Video Pembelajaran (hapus juga semua akses terkait)
exports.deleteVideoPembelajaran = async (req, res) => {
  try {
    const video = await VideoPembelajaran.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ message: "Video tidak ditemukan" });

    await VideoPembelajaranAccess.deleteMany({ videoId: req.params.id });

    res.status(200).json({ message: "Video dan akses terkait berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   🔑 VIDEO PEMBELAJARAN ACCESS CONTROLLERS
========================================================= */

// ✅ Create Access
exports.createVideoAccess = async (req, res) => {
  try {
    const access = await VideoPembelajaranAccess.create(req.body);
    res.status(201).json(access);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get All Access (populate video)
exports.getAllVideoAccess = async (req, res) => {
  try {
    const accessList = await VideoPembelajaranAccess.find()
      .populate("videoId", "judul status jenjang topikIPA")
      .sort({ createdAt: -1 });
    res.status(200).json(accessList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Access by Video ID
exports.getAccessByVideoId = async (req, res) => {
  try {
    const accessList = await VideoPembelajaranAccess.find({ videoId: req.params.videoId })
      .populate("videoId", "judul status jenjang topikIPA");
    res.status(200).json(accessList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Access
exports.updateVideoAccess = async (req, res) => {
  try {
    const access = await VideoPembelajaranAccess.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!access) return res.status(404).json({ message: "Data akses tidak ditemukan" });
    res.status(200).json(access);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete Access
exports.deleteVideoAccess = async (req, res) => {
  try {
    const deleted = await VideoPembelajaranAccess.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Data akses tidak ditemukan" });
    res.status(200).json({ message: "Data akses berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
