const router = require("express").Router();
const paper_controller = require("../controllers/paper_controller");

router.post("/paper", paper_controller.create_paper);
router.get("/paper", paper_controller.get_paper);
router.delete("/paper/:id", paper_controller.delete_paper);

module.exports = router;
