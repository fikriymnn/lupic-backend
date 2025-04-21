const mongoose = require('mongoose')


const user_public_schema = new mongoose.Schema({
    nama:{
        type:String,
        required:true
    },
    Email: {
        type:String,
        required:true
    },
    no_wa: {
        type:String,
        required:true
    },
    hari: {
        type:String,
        required:true
    },
    tanggal:{
        type:String,
        required:true
    },
    bulan: {
        type:String,
        required:true
    },
    tahun: {
        type:String,
        required:true
    },
    no_wa: {
        type:String,
        required:true
    },
    instansi: {
        type:String,
        required:true
    }, 
    tgl_lahir: {
        type:String,
        required:true
    }
},
{timestamps:true}
)

module.exports =  mongoose.model("User_public",user_public_schema)