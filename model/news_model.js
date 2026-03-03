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
    },
    content:{
        type:String,
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
     createdAt: {
        type: Date,
        default: Date.now   // ⬅️ default otomatis
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}
)

module.exports =  mongoose.model("News",news_schema)
