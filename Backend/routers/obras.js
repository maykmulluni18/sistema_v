import express from 'express';
import { createObras, deleteObras, getObras, 
    getObrasID, updateObras } from '../controllers/Obras.js';

import { adminOnly , verifyUser } from '../middleware/VerifyAuth.js'

const router = express.Router()

router.get('/', getObras)
router.get('/:id', getObrasID)
router.post('/', createObras)
router.put('/:id', updateObras)
router.delete('/:id', deleteObras)

export default router