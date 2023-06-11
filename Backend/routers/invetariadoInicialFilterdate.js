import express from 'express';
import { getInventFilterDataId } from '../controllers/InventariadoInicialFilterDate.js';

import { adminOnly, verifyUser } from '../middleware/VerifyAuth.js'

const router = express.Router()

router.get('/:id', getInventFilterDataId)

export default router