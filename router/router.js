const router = require('express').Router()
const multer = require("multer")
// const upload = multer({ dest: 'file/' })
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'file'); // Folder tempat menyimpan file
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Menyimpan dengan nama unik
    }
});

const upload = multer({ storage: storage });

router.use("/",require("./user_routes"))
router.use("/",require("./toko_routes"))
router.use("/",require("./home_routes"))
router.use("/",require("./facility_routes"))
router.use("/",require("./news_routes"))
router.use("/",require("./activity_carousel_routes"))
router.use("/",require("./activity_goals_routes"))
router.use("/",require("./aboutus_routes"))
router.use("/",require("./gallery_routes"))
router.post("/file",upload.single('file'),(req,res)=>{
    if (!req.file) {
        return res.status(400).send('Tidak ada file yang di-upload.');
    }
    const fileUrl = `${req.file.filename}`;

    res.send(fileUrl)
})


module.exports = router