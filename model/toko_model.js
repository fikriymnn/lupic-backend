const mongoose = require('mongoose')


const toko_schema = new mongoose.Schema({
    judul: {
        type:String,
        required:true
    },
    deskripsi: {
        type:String,
        required:true
    },
    content: {
        type:String,
    },
    harga: {
        type:Number,
        required:true
    },
    gambar: {
        type:String
    },
    link_shopee: {
        type:String,
    },
    link_tokped: {
        type:String,
    },
},
{timestamps:true}
)

module.exports =  mongoose.model("Toko",toko_schema)