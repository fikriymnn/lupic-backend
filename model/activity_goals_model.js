const mongoose = require('mongoose')


const activity_goals_schema = new mongoose.Schema({
    point: {
        type: Number,
    },
    sub_point: {
        type: Number,
    },
    sub_sub_point: {
        type: Number,
    },
    text: {
        type: String,
    },
    year_1: {
        upi:String,
        unnes:String,
        undiksha:String
    },
    year_2: {
        upi:String,
        unnes:String,
        undiksha:String
    },
    year_3: {
        upi:String,
        unnes:String,
        undiksha:String
    },
    year_4: {
        upi:String,
        unnes:String,
        undiksha:String
    },
    year_5: {
        upi:String,
        unnes:String,
        undiksha:String
    },
    year_6: {
        upi:String,
        unnes:String,
        undiksha:String
    },

},
    { timestamps: true }
)

module.exports = mongoose.model("Activity_goals", activity_goals_schema)