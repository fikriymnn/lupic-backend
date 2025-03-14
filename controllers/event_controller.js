const Event = require("../model/event_model")

const news_controller = {
    get_event: async (req, res) => {
        try {
            const { page, limit, search,count } = req.query
            const s = parseInt((page - 1) * limit);
            const l = parseInt(limit);

            if (req.params.id) {
                const data = await Event.findOne({ _id: req.params.id })
                res.send(data)
            }else if(count&&search){
                const data = await Event.countDocuments({judul:{ $regex: search, $options: 'i' } })
                res.status(200).json(data)
            } else if (search) {
                const data = await Event.find({judul:{ $regex: search, $options: 'i' } }).sort({ createdAt: -1 }).skip(s)
                .limit(l);
                res.send(data)
            }else if(page&&limit) {
                const data = await Event.find().sort({ createdAt: -1 }).skip(s)
                    .limit(l);
                res.send(data)
            } else {
                const data = await Event.find().sort({ createdAt: -1 })
                res.send(data)
            }
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    create_event: async (req, res) => {
        try {
            const { tanggal,judul,gambar,lokasi,waktu,
            jam,kategori,peserta,harga,content,sub_content } = req.body
            await Event.create({
                tanggal,judul,gambar,lokasi,waktu,
            jam,kategori,peserta,harga,content,sub_content
            })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    update_event: async (req, res) => {
        try {
            const { tanggal,judul,gambar,lokasi,waktu,
            jam,kategori,peserta,harga,content,sub_content } = req.body
            const { id } = req.params

            await Event.updateOne({ _id: id }, { tanggal,judul,gambar,lokasi,waktu,
            jam,kategori,peserta,harga,content,sub_content })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    delete_event: async (req, res) => {
        try {
            const { id } = req.params

            await Event.deleteOne({ _id: id })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
}

module.exports = news_controller