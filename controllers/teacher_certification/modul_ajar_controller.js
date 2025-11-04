import ModulAjar from "../../model/teacher_certification/modulajar/modul_ajar_model.js";
import ModulAjarAccess from "../../model/teacher_certification/modulajar/modul_ajar_access_model.js";

// ✅ Create Modul Ajar
export const createModulAjar = async (req, res) => {
  try {
    const modul = await ModulAjar.create(req.body);
    res.status(201).json(modul);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get All Modul Ajar (with pagination & filter)
export const getAllModulAjar = async (req, res) => {
  try {
    // Ambil query params
    const { page = 1, limit = 10, topikIPA, jenjang } = req.query;

    // Buat filter dinamis
    const filter = {};
    if (topikIPA) filter.topikIPA = topikIPA;
    if (jenjang) filter.jenjang = jenjang;

    // Hitung total dokumen
    const total = await ModulAjar.countDocuments(filter);

    // Ambil data dengan pagination
    const modul = await ModulAjar.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      data: modul,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Modul Ajar by ID
export const getModulAjarById = async (req, res) => {
  try {
    const modul = await ModulAjar.findById(req.params.id);
    if (!modul) return res.status(404).json({ message: "Modul tidak ditemukan" });
    res.status(200).json(modul);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Modul Ajar
export const updateModulAjar = async (req, res) => {
  try {
    const modul = await ModulAjar.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(modul);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete Modul Ajar
export const deleteModulAjar = async (req, res) => {
  try {
    await ModulAjar.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Modul ajar berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ==========================
   MODUL AJAR ACCESS CONTROLLERS
============================= */

// ✅ Create Access
export const createAccess = async (req, res) => {
  try {
    const access = await ModulAjarAccess.create(req.body);
    res.status(201).json(access);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get All Access (populate modul ajar)
export const getAllAccess = async (req, res) => {
  try {
    const accessList = await ModulAjarAccess.find()
      .populate("modulAjar", "judulModul status topikIPA jenjang")
      .sort({ createdAt: -1 });

    res.status(200).json(accessList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Access by Modul Ajar
export const getAccessByModul = async (req, res) => {
  try {
    const accessList = await ModulAjarAccess.find({ modulAjar: req.params.modulId })
      .populate("modulAjar", "judulModul topikIPA jenjang");

    res.status(200).json(accessList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Access
export const updateAccess = async (req, res) => {
  try {
    const access = await ModulAjarAccess.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(access);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete Access
export const deleteAccess = async (req, res) => {
  try {
    await ModulAjarAccess.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Access data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
