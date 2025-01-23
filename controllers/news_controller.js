const News = require("../model/news_model")

const news_controller = {
    get_news:async(req,res)=>{
        try{
    
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    create_news:async(req,res)=>{
        try{
    
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    update_news:async(req,res)=>{
        try{
    
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    delete_news:async(req,res)=>{
        try{
    
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    },
    }
    
    module.exports = news_controller