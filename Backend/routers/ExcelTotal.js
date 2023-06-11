import express from 'express'
import { uploadExel } from '../middleware/upload.js'
import { DownloadTotal } from '../controllers/ExcelTotalCard.js';

const router = express.Router();

router.get("/download", DownloadTotal);


export default router