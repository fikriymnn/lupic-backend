const mongoose = require('mongoose')


const activity_goals_schema = new mongoose.Schema({
    point: {
        type: Number,
    },
    sub_point: {
        type: Number,
    },
    text: {
        type: String,
    },
    year_1: {
        type: Boolean,
        default:false
    },
    year_2: {
        type: Boolean,
        default:false
    },
    year_3: {
        type: Boolean,
        default:false
    },
    year_4: {
        type: Boolean,
        default:false
    },
    year_5: {
        type: Boolean,
        default:false
    },
    year_6: {
        type: Boolean,
        default:false
    },

},
    { timestamps: true }
)

module.exports = mongoose.model("Activity_goals", activity_goals_schema)