import express from 'express'
import { createNeasEntradas, deleteNeasEntradas, getNeaEntradas, getNeaEntradasId, updateNeasEntradas } from '../controllers/NeaEntradas.js'
import { adminOnly } from '../middleware/VerifyAuth.js'

const router = express.Router()

router.get('/', getNeaEntradas)
router.get('/:id', getNeaEntradasId)
router.post('/',adminOnly, createNeasEntradas)
router.put('/:id', adminOnly, updateNeasEntradas)
router.delete('/:id',adminOnly, deleteNeasEntradas)
export default router