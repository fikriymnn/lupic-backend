const Activity_carousel = require("../model/activity_carousel_model")

const activity_carousel_controller = {
    get_activity_carousel:async(req,res)=>{
        try{
    
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    create_activity_carousel:async(req,res)=>{
        try{
    
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    update_activity_carousel:async(req,res)=>{
        try{
    
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    delete_activity_carousel:async(req,res)=>{
        try{
    
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    }
    
    module.exports = activity_carousel_controller