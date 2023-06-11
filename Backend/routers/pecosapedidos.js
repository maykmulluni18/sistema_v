import express from 'express'
import {createPecosaPedidos,
    deletePecosaPedidos, 
    getPecosaPedidos,
    getPecosaPedidosId,
    updatePecosaPedidos
} from '../controllers/PecosaPedidos.js'

const router = express.Router()

router.get('/', getPecosaPedidos)
router.get('/:id', getPecosaPedidosId)
router.post('/', createPecosaPedidos)
router.put('/:id', updatePecosaPedidos)
router.delete('/:id', deletePecosaPedidos)

export default router