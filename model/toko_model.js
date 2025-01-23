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
    harga: {
        type:Number,
        required:true
    },
    deskripsi: {
        type:String,
        required:true
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