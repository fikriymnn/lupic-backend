const Home = require("../model/home_model")

const home_controller = {
get_home:async(req,res)=>{
    try{
       const data = await Home.find()
       res.json({
        success:true,
        hero_section:data[0].hero_section,
        carousel:data[0].carousel
       })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
},
create_home:async(req,res)=>{
    try{
        const {hero_section,carousel} = req.body
        await Home.create({
            hero_section,
            carousel
        })
        res.send("success")
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
},
update_home:async(req,res)=>{
    try{
        const {hero_section,carousel} = req.body
        const {id} = req.params

        await Home.updateOne({_id:id},{hero_section,carousel})
        res.send("success")
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
}

module.exports = home_controller