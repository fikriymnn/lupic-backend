const router = require('express').Router()
const activity_goals_controller = require('../controllers/activity_goals_controller')

router.post("/activity_goals",activity_goals_controller.create_activity_goals)
router.get("/activity_goals/:id?",activity_goals_controller.get_activity_goals)
router.delete("/activity_goals/:id",activity_goals_controller.delete_activity_goals)
router.put("/activity_goals/:id",activity_goals_controller.update_activity_goals)

module.exports = router