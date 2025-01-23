const router = require('express').Router()
const facility_controller = require('../controllers/facility_controller')

router.post("/facility",facility_controller.create_facility)
router.get("/facility/:id?",facility_controller.get_facility)
router.delete("/facility/:id",facility_controller.delete_facility)
router.put("/facility/:id",facility_controller.update_facility)

module.exports = router