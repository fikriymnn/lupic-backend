const Facility = require("../model/facility_model")

const facility_controller = {
    get_facility: async (req, res) => {
        try {
            if (req.params.id) {
                const data = await Facility.findOne({ _id: req.params.id })
                res.send(data)
            } else {
                const data = await Facility.find()
                res.send(data)
            }
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    create_facility: async (req, res) => {
        try {
            const { judul, deskripsi, content,gambar } = req.body
            await Facility.create({
                judul, deskripsi, content,gambar
            })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    update_facility: async (req, res) => {
        try {
            const { judul, deskripsi, content,gambar } = req.body
            const { id } = req.params

            await Facility.updateOne({ _id: id }, { judul, deskripsi, content,gambar })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    delete_facility: async (req, res) => {
        try {
            const { id } = req.params
            await Facility.deleteOne({ _id: id })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
}

module.exports = facility_controller