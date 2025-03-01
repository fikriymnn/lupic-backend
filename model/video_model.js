const mongoose = require('mongoose')


const video_schema = new mongoose.Schema({
    link: {
       type:String,
    },
    judul: {
        type:String,
     },

},
{timestamps:true}
)

module.exports =  mongoose.model("Video",video_schema)