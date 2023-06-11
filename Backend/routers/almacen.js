import express from 'express';
import { createAlmacen, deleteAlmacen, getAlmacen, 
    getAlmacenID, updateAlmacen } from '../controllers/Almacen.js';

import { adminOnly , verifyUser } from '../middleware/VerifyAuth.js'

const router = express.Router()

router.get('/', getAlmacen)
router.get('/:id', getAlmacenID)
router.post('/', createAlmacen)
router.put('/:id', updateAlmacen)
router.delete('/:id', deleteAlmacen)

export default router