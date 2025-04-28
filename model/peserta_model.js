const mongoose = require('mongoose')

const peserta_schema = new mongoose.Schema({
    nama:{
        type:String,
        required:true
    },
    email: {
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

module.exports =  mongoose.model("Peserta",peserta_schema)