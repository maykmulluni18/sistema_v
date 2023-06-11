import express from 'express';
import { getCantidad } from '../controllers/Ejemplo.js';

import { adminOnly , verifyUser } from '../middleware/VerifyAuth.js'

const router = express.Router()

router.get('/', getCantidad)

export default router