const router = require('express').Router()
const event_controller = require('../controllers/event_controller')

router.post("/event",event_controller.create_event)
router.get("/event/:id?",event_controller.get_event)
router.delete("/event/:id",event_controller.delete_event)
router.put("/event/:id",event_controller.update_event)

module.exports = router