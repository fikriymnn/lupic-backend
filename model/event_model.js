const mongoose = require('mongoose')


const event_schema = new mongoose.Schema({
    tanggal: {
        type:String,
    },
    judul: {
        type:String,
        required:true
    },
    gambar: {
        type:String,
        required:true
    },
    lokasi: {
        type:String,
    },
    waktu: {
        type:String,
    },
    jam : {
        type:String,
    },
    kategori:{
        type:String,
    },
    peserta: {
        type:String,
    },
    harga:{
        type:String,
    },
    content: {
        type:String,
    },
    sub_content: [{
        sub_judul:String,
        sub_gambar:Array,
        sub_content:String
    }],
},
{timestamps:true}
)

module.exports =  mongoose.model("Event",event_schema)
