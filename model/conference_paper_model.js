const mongoose = require('mongoose')

const conference_papper_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    cover: {
        type:String
    },
    module: [
        {
            title: String,
            description: String,
            file: String,
            cover: String
        }
    ]
},
{ timestamps: true }
)

module.exports = mongoose.model("ConferencePapper", conference_papper_schema)
