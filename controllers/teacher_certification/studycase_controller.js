const StudyCase = require("../../model/teacher_certification/studycase/studycase_model");
const StudyCaseAnswer = require("../../model/teacher_certification/studycase/studycase_answer_model");
const StudyCaseForum = require("../../model/teacher_certification/studycase/studycase_forum_model");

// =======================
// 📘 STUDY CASE CRUD
// =======================

// CREATE Study Case
exports.createStudyCase = async (req, res) => {
  try {
    const studyCase = new StudyCase(req.body);
    await studyCase.save();
    res.status(201).json(studyCase);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ GET ALL STUDY CASES (dengan filter + pagination)
exports.getAllStudyCases = async (req, res) => {
  try {
    const { topikIPA, jenjang, kompetensiGuru, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (topikIPA) filter.topikIPA = topikIPA;
    if (jenjang) filter.jenjang = jenjang;
    if (kompetensiGuru) filter.kompetensiGuru = kompetensiGuru;

    const skip = (Number(page) - 1) * Number(limit);

    const [data, total] = await Promise.all([
      StudyCase.find(filter)
        .populate("answer")
        .populate("forums")
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
      StudyCase.countDocuments(filter)
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

// GET Single Study Case by ID
exports.getStudyCaseById = async (req, res) => {
  try {
    const studyCase = await StudyCase.findById(req.params.id)
      .populate("answer")
      .populate("forums");
    if (!studyCase) return res.status(404).json({ message: "Study case not found" });
    res.json(studyCase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Study Case
exports.updateStudyCase = async (req, res) => {
  try {
    const studyCase = await StudyCase.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!studyCase) return res.status(404).json({ message: "Study case not found" });
    res.json(studyCase);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE Study Case (hapus juga relasi answer & forum)
exports.deleteStudyCase = async (req, res) => {
  try {
    const studyCase = await StudyCase.findByIdAndDelete(req.params.id);
    if (!studyCase) return res.status(404).json({ message: "Study case not found" });

    await StudyCaseAnswer.deleteOne({ studyCaseId: req.params.id });
    await StudyCaseForum.deleteMany({ studyCaseId: req.params.id });

    res.json({ message: "Study case and related data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================
// 🧠 STUDY CASE ANSWER CRUD
// =======================
exports.createAnswer = async (req, res) => {
  try {
    const { studyCaseId, userId, answer } = req.body;

    const existing = await StudyCaseAnswer.findOne({ studyCaseId });
    if (existing)
      return res.status(400).json({ message: "Answer already exists for this study case" });

    const newAnswer = new StudyCaseAnswer({ studyCaseId, userId, answer });
    await newAnswer.save();
    res.status(201).json(newAnswer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateAnswer = async (req, res) => {
  try {
    const updated = await StudyCaseAnswer.findOneAndUpdate(
      { studyCaseId: req.params.studyCaseId },
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
    const deleted = await StudyCaseAnswer.findOneAndDelete({
      studyCaseId: req.params.studyCaseId
    });
    if (!deleted) return res.status(404).json({ message: "Answer not found" });
    res.json({ message: "Answer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================
// 💬 STUDY CASE FORUM CRUD
// =======================
exports.createForumMessage = async (req, res) => {
  try {
    const { studyCaseId, userId, message } = req.body;
    const forumMsg = new StudyCaseForum({ studyCaseId, userId, message });
    await forumMsg.save();
    res.status(201).json(forumMsg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getForumByStudyCase = async (req, res) => {
  try {
    const messages = await StudyCaseForum.find({ studyCaseId: req.params.studyCaseId })
      .populate("userId", "name email")
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteForumMessage = async (req, res) => {
  try {
    const deleted = await StudyCaseForum.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Forum message deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
