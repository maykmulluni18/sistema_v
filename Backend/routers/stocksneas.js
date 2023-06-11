import express from 'express';
import { getStockNea } from '../controllers/Ejemplo.js';

import { adminOnly , verifyUser } from '../middleware/VerifyAuth.js'

const router = express.Router()

router.get('/', getStockNea)

export default router