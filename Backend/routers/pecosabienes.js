import express from 'express';
import { createPecosaBienes, deletePecosaBienes, 
    getPecosaBienes, getPecosaBienesId, 
    updatePecosaBienes } from '../controllers/PecosaBienes.js';

const router = express.Router()

router.get('/', getPecosaBienes)
router.get('/:id', getPecosaBienesId)
router.post('/', createPecosaBienes)
router.put('/:id',updatePecosaBienes)
router.delete('/:id', deletePecosaBienes)

export default router