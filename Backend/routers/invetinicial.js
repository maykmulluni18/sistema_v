import express from 'express';
import {
    createInventBienes,
    deleteInventBienes,
    getInventBienes,
    getInventBienesId,
    updateInventBienes
} from '../controllers/InvetarioInicial.js';

import { adminOnly, verifyUser } from '../middleware/VerifyAuth.js'

const router = express.Router()

router.get('/', getInventBienes)
router.get('/:id', getInventBienesId)
router.post('/', createInventBienes)
router.put('/:id', updateInventBienes)
router.delete('/:id', deleteInventBienes)

export default router