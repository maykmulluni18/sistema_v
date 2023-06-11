import express from 'express'
import { uploadExel } from '../middleware/upload.js'
import { DownloadSalidaTotal } from '../controllers/ExcelSalidaTotal.js';

const router = express.Router();

router.get("/download", DownloadSalidaTotal);




export default router