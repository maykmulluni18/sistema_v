
import express from 'express'
import { AdministrativosExcelupload, getReporAdministrativos } from '../controllers/AdministrativosExcel.js';
import { uploadExel } from '../middleware/upload.js'

const router = express.Router();

router.post("/upload", uploadExel.single('file'),AdministrativosExcelupload,(req, res) =>{
    console.log(req.file);
    res.send("ok")
});

router.get("/tutorials", getReporAdministrativos);

//router.get("/download", excelController.download);

export default router