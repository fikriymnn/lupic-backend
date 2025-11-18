const mongoose = require("mongoose")
const { model } = mongoose

const KnowlageTestSchema = new mongoose.Schema({
    paketId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "KnowlageTestPaket", 
    },
    kategori: {    
        type: String,    //PCK atau SJT
        required: true
    },
    soal: [{
        type: String, //IMAGES atau TEXT
        value:String   
    }],
    pilihan: [{
        type: String, 
    }],
    jawaban: {
        type: String,
    },
})

module.exports = model("KnowlageTest", KnowlageTestSchema)
