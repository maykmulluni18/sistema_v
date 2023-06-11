
import express from 'express'
import { getReporNeas, NeasExcelupload } from '../controllers/NeasBienesExel.js';
import { uploadExel } from '../middleware/upload.js'

const router = express.Router();

router.post("/upload", uploadExel.single('file'),NeasExcelupload,(req, res) =>{
    console.log(req.file);
    res.send("ok")
});

router.get("/tutorials", getReporNeas);

//router.get("/download", excelController.download);

export default router