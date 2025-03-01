const mongoose = require('mongoose')


const jadwal_schema = new mongoose.Schema({
    hari: {
       type:String,
    },
    tanggal: {
        type: String,
    },
    bulan: {
        type: String,
    },
    tahun: {
        type: String,
    },
},
{timestamps:true}
)

module.exports =  mongoose.model("Jadwal",jadwal_schema)