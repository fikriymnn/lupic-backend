const News = require("../model/news_model")

const parseTanggal = (tanggalString) => {
    const [day, month, year] = tanggalString.split("/")
    return new Date(year, month - 1, day)
}

const news_controller = {
    get_news: async (req, res) => {
        try {
            const { page, limit, search, count } = req.query
            const s = parseInt((page - 1) * limit);
            const l = parseInt(limit);

            if (req.params.id) {
                const data = await News.findOne({ _id: req.params.id })
                res.send(data)
            } else if (count && search) {
                const data = await News.countDocuments({ judul: { $regex: search, $options: 'i' } })
                res.status(200).json(data)
            } else if (search) {
                const data = await News.find({ judul: { $regex: search, $options: 'i' } }).sort({ createdAt: -1 }).skip(s)
                    .limit(l);
                res.send(data)
            } else if (page && limit) {
                const data = await News.find().sort({ createdAt: -1 }).skip(s)
                    .limit(l);
                res.send(data)
            } else {
                const data = await News.find().sort({ createdAt: -1 })
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
            const { judul, deskripsi, gambar, sub_content, tanggal, author, content } = req.body

            const createdDate = parseTanggal(tanggal)

            await News.create({
                judul,
                deskripsi,
                gambar,
                sub_content,
                tanggal,               // tetap string
                author,
                content,
                createdAt: createdDate // hasil convert
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
            const { judul, deskripsi, gambar, sub_content, tanggal, author, content } = req.body
            const { id } = req.params

            const createdDate = parseTanggal(tanggal)

            await News.updateOne(
                { _id: id },
                {
                    judul,
                    deskripsi,
                    gambar,
                    sub_content,
                    tanggal,               // tetap string
                    author,
                    content,
                    createdAt: createdDate
                }
            )

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