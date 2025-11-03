const router = require("express").Router();
const {createUseCase,getUseCaseById,getAllUseCases,updateUseCase,deleteUseCase,createAnswer,updateAnswer,deleteAnswer,createForumMessage,getForumByUseCase,deleteForumMessage} = require("../../controllers/teacher_certification/usecase_controller");

// =============================
// 📘 USE CASE CRUD
// =============================
router.post("/use_case", createUseCase);
router.get("/use_case/:id?", getUseCaseById);
router.get("/use_case", getAllUseCases);
router.put("/use_case/:id", updateUseCase);
router.delete("/use_case/:id", deleteUseCase);

// =============================
// 🧠 USE CASE ANSWER CRUD
// =============================
router.post("/use_case_answer", createAnswer);
router.put("/use_case_answer/:useCaseId", updateAnswer);
router.delete("/use_case_answer/:useCaseId", deleteAnswer);

// =============================
// 💬 USE CASE FORUM CRUD
// =============================
router.post("/use_case_forum", createForumMessage);
router.get("/use_case_forum/:useCaseId", getForumByUseCase);
router.delete("/use_case_forum/:id", deleteForumMessage);

module.exports = router;
