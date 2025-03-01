const Modul = require("../model/modul_model")

const modul_controller = {
    get_modul: async (req, res) => {
        try {
                const data = await Modul.find()
                res.send(data)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    create_modul: async (req, res) => {
        try {
            const { cover,judul,file } = req.body
            await Modul.create({
                cover,judul,file
            })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    delete_modul: async (req, res) => {
        try {
            const { id } = req.params
            await Modul.deleteOne({ _id: id })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    }
    
module.exports = modul_controller