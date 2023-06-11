import express from 'express'
import { createNeasBienes, deleteNeasBienes, 
    getNeasBienes, getNeasBienesId, 
    updateNeasBienes } from '../controllers/NeaBien.js'

const router = express.Router()

router.get('/', getNeasBienes)
router.get('/:id', getNeasBienesId)
router.post('/', createNeasBienes)
router.put('/:id', updateNeasBienes)
router.delete('/:id', deleteNeasBienes)

export default router