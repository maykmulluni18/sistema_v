
import express from 'express'
import { BienesExcelupload, getReporBienes } from '../controllers/BienesExcel.js';
import { uploadExel } from '../middleware/upload.js'

const router = express.Router();

router.post("/upload", uploadExel.single('file'),BienesExcelupload,(req, res) =>{
    console.log(req.file);
    res.send("ok")
});

router.get("/tutorials", getReporBienes);

//router.get("/download", excelController.download);

export default router