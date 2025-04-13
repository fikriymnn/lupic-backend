const mongoose = require('mongoose')

const jadwal_schema = new mongoose.Schema({
    hari: {
       type:String,
    },
    status: {
        type:Boolean,
        default:true,
    }
},
{timestamps:true}
)

module.exports =  mongoose.model("Jadwal",jadwal_schema)