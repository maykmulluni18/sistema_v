import express from 'express'
import { getPecosaBienesPeidosId } from '../controllers/PecosaBienesIdPecosaPedidos.js'

const router = express.Router()

router.get('/:id', getPecosaBienesPeidosId)

export default router