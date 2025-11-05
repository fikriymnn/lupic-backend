const router = require("express").Router();
const {
  createStudyCase,
  getStudyCaseById,
  getAllStudyCases,
  updateStudyCase,
  deleteStudyCase,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  createForumMessage,
  getForumByStudyCase,
  deleteForumMessage
} = require("../../controllers/teacher_certification/studycase_controller");

// =============================
// 📘 STUDY CASE CRUD
// =============================
router.post("/study_case", createStudyCase);
router.get("/study_case/:id?", getStudyCaseById);
router.get("/study_case", getAllStudyCases);
router.put("/study_case/:id", updateStudyCase);
router.delete("/study_case/:id", deleteStudyCase);

// =============================
// 🧠 STUDY CASE ANSWER CRUD
// =============================
router.post("/study_case_answer", createAnswer);
router.put("/study_case_answer/:studyCaseId", updateAnswer);
router.delete("/study_case_answer/:studyCaseId", deleteAnswer);

// =============================
// 💬 STUDY CASE FORUM CRUD
// =============================
router.post("/study_case_forum", createForumMessage);
router.get("/study_case_forum/:studyCaseId", getForumByStudyCase);
router.delete("/study_case_forum/:id", deleteForumMessage);

module.exports = router;
