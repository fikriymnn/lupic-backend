const mongoose = require('mongoose')


const facility_schema = new mongoose.Schema({
    judul: {
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
},
{timestamps:true}
)

module.exports =  mongoose.model("Facility",facility_schema)
