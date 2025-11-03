const UseCase = require("../../model/teacher_certification/usecase/usecase_model");
const UseCaseAnswer = require("../../model/teacher_certification/usecase/usecase_answer_model");
const UseCaseForum = require("../../model/teacher_certification/usecase/usecase_forum_model");

// =======================
// 📘 USE CASE CRUD
// =======================

// CREATE Use Case
exports.createUseCase = async (req, res) => {
  try {
    const useCase = new UseCase(req.body);
    await useCase.save();
    res.status(201).json(useCase);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ GET ALL USE CASES (dengan filter + pagination)
exports.getAllUseCases = async (req, res) => {
  try {
    // Ambil query filter dari request
    const { topikIPA, jenjang, kompetensiGuru, page = 1, limit = 10 } = req.query;

    // Buat objek filter dinamis
    const filter = {};
    if (topikIPA) filter.topikIPA = topikIPA;
    if (jenjang) filter.jenjang = jenjang;
    if (kompetensiGuru) filter.kompetensiGuru = kompetensiGuru;

    const skip = (Number(page) - 1) * Number(limit);

    // Jalankan query
    const [data, total] = await Promise.all([
      UseCase.find(filter)
        .populate("answer")
        .populate("forums")
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
      UseCase.countDocuments(filter)
    ]);

    res.json({
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      totalData: total,
      data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET Single Use Case by ID
exports.getUseCaseById = async (req, res) => {
  try {
    const useCase = await UseCase.findById(req.params.id)
      .populate("answer")
      .populate("forums");
    if (!useCase) return res.status(404).json({ message: "Use case not found" });
    res.json(useCase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Use Case
exports.updateUseCase = async (req, res) => {
  try {
    const useCase = await UseCase.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!useCase) return res.status(404).json({ message: "Use case not found" });
    res.json(useCase);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE Use Case (hapus juga relasi answer & forum)
exports.deleteUseCase = async (req, res) => {
  try {
    const useCase = await UseCase.findByIdAndDelete(req.params.id);
    if (!useCase) return res.status(404).json({ message: "Use case not found" });

    await UseCaseAnswer.deleteOne({ useCaseId: req.params.id });
    await UseCaseForum.deleteMany({ useCaseId: req.params.id });

    res.json({ message: "Use case and related data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================
// 🧠 USE CASE ANSWER CRUD
// =======================
exports.createAnswer = async (req, res) => {
  try {
    const { useCaseId, userId, answer } = req.body;

    const existing = await UseCaseAnswer.findOne({ useCaseId });
    if (existing)
      return res.status(400).json({ message: "Answer already exists for this use case" });

    const newAnswer = new UseCaseAnswer({ useCaseId, userId, answer });
    await newAnswer.save();
    res.status(201).json(newAnswer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateAnswer = async (req, res) => {
  try {
    const updated = await UseCaseAnswer.findOneAndUpdate(
      { useCaseId: req.params.useCaseId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Answer not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const deleted = await UseCaseAnswer.findOneAndDelete({
      useCaseId: req.params.useCaseId
    });
    if (!deleted) return res.status(404).json({ message: "Answer not found" });
    res.json({ message: "Answer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================
// 💬 USE CASE FORUM CRUD
// =======================
exports.createForumMessage = async (req, res) => {
  try {
    const { useCaseId, userId, message } = req.body;
    const forumMsg = new UseCaseForum({ useCaseId, userId, message });
    await forumMsg.save();
    res.status(201).json(forumMsg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getForumByUseCase = async (req, res) => {
  try {
    const messages = await UseCaseForum.find({ useCaseId: req.params.useCaseId })
      .populate("userId", "name email")
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteForumMessage = async (req, res) => {
  try {
    const deleted = await UseCaseForum.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Forum message deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
