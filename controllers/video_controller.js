const Video = require("../model/video_model")

const video_controller = {
    get_video: async (req, res) => {
        try {
                const data = await Video.find()
                res.send(data)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    create_video: async (req, res) => {
        try {
            const { cover,judul,file } = req.body
            await Video.create({
                cover,judul,file
            })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    delete_video: async (req, res) => {
        try {
            const { id } = req.params
            await Video.deleteOne({ _id: id })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    }
    
module.exports = video_controller