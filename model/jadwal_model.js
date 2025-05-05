const mongoose = require('mongoose')

const jadwal_schema = new mongoose.Schema({
    hari: {
       type:String,
       required:true
    },
    tanggal:{
        type:String,
        required:true
    },
    bulan:{
        type:String,
        required:true
    },
    tahun:{
        type:String,
        required:true
    },
    status: {
        type:String,
        default:"Aktif",
    }
},
{timestamps:true}
)

module.exports =  mongoose.model("Jadwal",jadwal_schema)