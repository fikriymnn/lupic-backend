const Toko = require("../model/toko_model")

const toko_controller = {
    get_toko:async(req,res)=>{
        try{
    
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    create_toko:async(req,res)=>{
        try{
    
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    update_toko:async(req,res)=>{
        try{
    
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    delete_toko:async(req,res)=>{
        try{
    
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    }
    
    module.exports = toko_controller