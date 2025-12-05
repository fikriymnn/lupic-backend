const Aboutus = require("../model/aboutus_model")

const aboutus_controller = {
    get_aboutus:async(req,res)=>{
        try{
            const data = await Aboutus.find()
            res.send(data[0]) 
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    create_aboutus:async(req,res)=>{
        try{
            const {gambar,nama,deskripsi,pesan,partnerBanner,partner,collaboration} = req.body
    
            await Aboutus.create({
                gambar,nama,deskripsi,pesan,partnerBanner,partner,collaboration
            })
            res.send("success")
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    update_aboutus:async(req,res)=>{
        try{
            const {id} = req.params
            const {gambar,nama,deskripsi,pesan,partnerBanner,partner,collaboration} = req.body

            await Aboutus.updateOne({_id:id},{gambar,nama,deskripsi,pesan,partnerBanner,partner,collaboration})
            res.send("success")
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    }
    
    module.exports = aboutus_controller