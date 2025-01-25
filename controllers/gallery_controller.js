const Gallery = require("../model/gallery_model")

const gallery_controller = {
get_gallery:async(req,res)=>{
    try{
       const data = await Gallery.find()
       res.json(data)
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
},
create_gallery:async(req,res)=>{
    try{
        const {gambar,deskripsi} = req.body
        await Gallery.create({
            gambar,deskripsi
        })
        res.send("success")
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
},
delete_gallery: async (req, res) => {
        try {
            const { id } = req.params

            await Gallery.deleteOne({ _id: id })
            res.send("success")
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
}

module.exports = gallery_controller
