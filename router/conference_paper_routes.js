const router = require("express").Router();
const conference_papper_controller = require("../controllers/conference_paper_controller");

// Conference Papper routes
router.post("/conference-papper", conference_papper_controller.create_conference_papper);
router.get("/conference-papper", conference_papper_controller.get_conference_papper);
router.get("/conference-papper/:id", conference_papper_controller.get_conference_papper_by_id);
router.put("/conference-papper/:id", conference_papper_controller.update_conference_papper);
router.delete("/conference-papper/:id", conference_papper_controller.delete_conference_papper);

// Module routes
router.post("/conference-papper/:id/module", conference_papper_controller.add_module);
router.put("/conference-papper/:id/module/:module_id", conference_papper_controller.update_module);
router.delete("/conference-papper/:id/module/:module_id", conference_papper_controller.delete_module);

module.exports = router;