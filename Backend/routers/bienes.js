import express from 'express';
import {
    getBienes,
    getBienesID,
    createBienes,
    updateBienes,
    deleteBienes
} from '../controllers/Bienes.js'

import { adminOnly , verifyUser } from '../middleware/VerifyAuth.js'

const router = express.Router()

router.get('/', getBienes)
router.get('/:id',getBienesID)
router.post('/',createBienes)
router.put('/:id',updateBienes)
router.delete('/:id',deleteBienes)

export default router