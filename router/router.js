const router = require('express').Router()
const multer = require("multer")
const upload = multer({ dest: 'file/' })

router.use("/",require("./user_routes"))
router.use("/",require("./toko_routes"))
router.use("/",require("./home_routes"))
router.use("/",require("./facility_routes"))
router.use("/",require("./news_routes"))
router.use("/",require("./activity_carousel_routes"))
router.use("/",require("./activity_goals_routes"))
router.use("/",require("./aboutus_routes"))
router.post("/file",upload.single('file'),(req,res)=>{
    if (!req.file) {
        return res.status(400).send('Tidak ada file yang di-upload.');
    }

    const fileUrl = `${process.env.URL}/file/${req.file.filename}`;

    res.send(fileUrl)
})


module.exports = router