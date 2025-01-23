const Activity_goals = require("../model/activity_goals_model")

const activity_goals_controller = {
     get_activity_goals: async (req, res) => {
            try {
                const data = await Activity_goals.find()
                res.send(data)
            } catch (err) {
                res.status(500).json({
                    message: err.message
                })
            }
        },
        create_activity_goals: async (req, res) => {
            try {
                await Activity_goals.insertMany(req.body)
                res.send("success")
            } catch (err) {
                res.status(500).json({
                    message: err.message
                })
            }
        },
        update_activity_goals: async (req, res) => {
            try {
                const { point,sub_point,text,year_1,year_2,year_3,year_4,year_5,year_6 } = req.body
                const { id } = req.params
    
                await Activity_goals.updateOne({ _id: id }, { point,sub_point,text,year_1,year_2,year_3,year_4,year_5,year_6 })
                res.send("success")
            } catch (err) {
                res.status(500).json({
                    message: err.message
                })
            }
        },
        delete_activity_goals: async (req, res) => {
            try {
                const { id } = req.params
    
                await Activity_goals.deleteOne({ _id: id })
                res.send("success")
            } catch (err) {
                res.status(500).json({
                    message: err.message
                })
            }
        },
    }
    
    module.exports = activity_goals_controller