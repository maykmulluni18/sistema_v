import express from 'express';
import { createMetas, deleteMetas, getMetas, getMetasID, updateMetas } 
from '../controllers/Metas.js';

const router = express.Router()

router.get('/', getMetas)
router.get('/:id', getMetasID)
router.post('/', createMetas)
router.put('/:id', updateMetas)
router.delete('/:id', deleteMetas)

export default router