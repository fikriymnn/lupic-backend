const Activity_carousel = require("../model/activity_carousel_model")

const activity_carousel_controller = {
    get_activity_carousel: async (req, res) => {
        try {
            const data = await Activity_carousel.find()
            res.send(data)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    create_activity_carousel: async (req, res) => {
        try {
            const { judul, deskripsi, gambar } = req.body
            await Activity_carousel.create({
                judul, deskripsi, gambar
            })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    update_activity_carousel: async (req, res) => {
        try {
            const { judul, deskripsi, gambar } = req.body
            const { id } = req.params

            await Activity_carousel.updateOne({ _id: id }, { judul, deskripsi, gambar })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    delete_activity_carousel: async (req, res) => {
        try {
            const { id } = req.params

            await Activity_carousel.deleteOne({ _id: id })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
}

module.exports = activity_carousel_controller