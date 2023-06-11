import express from 'express'
import { Excelupload, getReporInventariado, Download } from '../controllers/ExelCsvInventariado.js';
import { uploadExel } from '../middleware/upload.js'

const router = express.Router();

router.get("/download", Download);

router.post("/upload", uploadExel.single('file'),Excelupload,(req, res) =>{
    console.log(req.file);
    res.send("ok")
});



export default router