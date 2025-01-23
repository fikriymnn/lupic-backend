const mongoose = require('mongoose')


const news_schema = new mongoose.Schema({
    judul: {
        type:String,
        required:true
    },
    author: {
        type:String,
        required:true
    },
    tanggal: {
        type:String,
        required:true
    },
    deskripsi: {
        type:String,
        required:true
    },
    gambar: {
        type:String,
        required:true
    },
    sub_content: [{
        sub_judul:String,
        sub_gambar:Array,
        sub_content:String
    }],
},
{timestamps:true}
)

module.exports =  mongoose.model("News",news_schema)
