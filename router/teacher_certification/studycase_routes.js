const router = require("express").Router();

const studyCase = require("../../controllers/teacher_certification/studycase_controller")

// =============================
// 📘 STUDY CASE CRUD
// =============================
router.post("/study_case", studyCase.createStudyCase);
router.get("/study_case/id/:id", studyCase.getStudyCaseById);
router.get("/study_case", studyCase.getAllStudyCases);
router.put("/study_case/:id", studyCase.updateStudyCase);
router.delete("/study_case/:id", studyCase.deleteStudyCase);

// =============================
// 🧠 STUDY CASE ANSWER CRUD
// =============================
router.post("/study_case_answer", studyCase.createAnswer);
router.put("/study_case_answer/:studyCaseId", studyCase.updateAnswer);
router.delete("/study_case_answer/:studyCaseId", studyCase.deleteAnswer);

// =============================
// 💬 STUDY CASE FORUM CRUD
// =============================
router.post("/study_case_forum", studyCase.createForumMessage);
router.get("/study_case_forum/:studyCaseId", studyCase.getForumByStudyCase);
router.delete("/study_case_forum/:id", studyCase.deleteForumMessage);

module.exports = router;
