const Home = require("../model/home_model")

const home_controller = {
    get_home: async (req, res) => {
        try {
            const data = await Home.find()
            res.json({
                _id: data[0]._id,
                success: true,
                hero_section: data[0].hero_section,
                carousel: data[0].carousel,
                hero_partner: data[0].hero_partner,
                hero_title:data[0].hero_title,
                hero_description:data[0].hero_description,
                footer_partner: data[0].footer_partner
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    create_home: async (req, res) => {
        try {
            const { hero_section, carousel,hero_partner,footer_partner,hero_description,hero_title } = req.body
            await Home.create({
                hero_section,
                carousel,
                hero_partner,footer_partner,hero_description,hero_title
            })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    update_home: async (req, res) => {
        try {
            const { hero_section, carousel,hero_partner,footer_partner,hero_description,hero_title } = req.body
            const { id } = req.params

            await Home.updateOne({ _id: id }, { hero_section, carousel,hero_partner,footer_partner,hero_description,hero_title })
            res.send("success")
        } catch (err) {
            console.log(err.message)
            res.status(500).json({
                message: err.message
            })
        }
    }
}

module.exports = home_controller