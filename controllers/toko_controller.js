const Toko = require("../model/toko_model")

const toko_controller = {
    get_toko: async (req, res) => {
        try {
            if (req.params.id) {
                const data = await Toko.findOne({ _id: req.params.id })
                res.send(data)
            } else {
                const data = await Toko.find()
                res.send(data)
            }
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    create_toko: async (req, res) => {
        try {
            const { judul, deskripsi, harga,link_shopee,link_tokped,gambar,content } = req.body
            await Toko.create({
                judul, deskripsi, harga,link_shopee,link_tokped,gambar,content
            })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    update_toko: async (req, res) => {
        try {
            const { judul, deskripsi, harga,link_shopee,link_tokped,gambar,content } = req.body
            const { id } = req.params

            await Toko.updateOne({ _id: id }, { judul, deskripsi, harga,link_shopee,link_tokped,gambar,content })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    delete_toko: async (req, res) => {
        try {
            const { id } = req.params

            await Toko.deleteOne({ _id: id })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    }
    
    module.exports = toko_controller