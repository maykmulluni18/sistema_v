import express from 'express';
import { getStock } from '../controllers/Ejemplo.js';

import { adminOnly , verifyUser } from '../middleware/VerifyAuth.js'

const router = express.Router()

router.get('/', getStock)

export default router