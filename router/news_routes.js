const router = require('express').Router()
const news_controller = require('../controllers/news_controller')

router.post("/news",news_controller.create_news)
router.get("/news/:id?",news_controller.get_news)
router.delete("/news/:id",news_controller.delete_news)
router.put("/news/:id",news_controller.update_news)

module.exports = router