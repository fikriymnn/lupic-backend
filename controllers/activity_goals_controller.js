const Activity_goals = require("../model/activity_goals_model")

const activity_goals_controller = {
    get_activity_goals:async(req,res)=>{
        try{
    
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    create_activity_goals:async(req,res)=>{
        try{
    
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    update_activity_goals:async(req,res)=>{
        try{
    
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    delete_activity_goals:async(req,res)=>{
        try{
    
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    }
    
    module.exports = activity_goals_controller