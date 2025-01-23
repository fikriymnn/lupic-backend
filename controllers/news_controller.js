const News = require("../model/news_model")

const news_controller = {
    get_news: async (req, res) => {
        try {
            const { page, limit, search } = req.query
            const s = parseInt((page - 1) * limit);
            const l = parseInt(limit);

            if (req.params.id) {
                const data = await News.findOne({ _id: req.params.id })
                res.send(data)
            } else if (search) {
                await News.find({judul:search})
                res.send(data)
            } else {
                const data = await News.find().skip(s)
                    .limit(l);
                res.send(data)
            }
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    create_news: async (req, res) => {
        try {
            const { judul, deskripsi, gambar, sub_content, tanggal, author } = req.body
            await News.create({
                judul, deskripsi, gambar, sub_content, tanggal, author
            })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    update_news: async (req, res) => {
        try {
            const { judul, deskripsi, gambar, sub_content, tanggal, author } = req.body
            const { id } = req.params

            await News.updateOne({ _id: id }, { judul, deskripsi, gambar, sub_content, tanggal, author })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    delete_news: async (req, res) => {
        try {
            const { id } = req.params

            await News.deleteOne({ _id: id })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
}

module.exports = news_controller