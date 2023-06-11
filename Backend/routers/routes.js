import express from 'express'
import { verifyUser, adminOnly } from "../middleware/VerifyAuth.js"
import { 
    createUsuarios, 
    deleteUsuarios, 
    getUsuario, 
    getUsuarios, 
    updateUsuarios 
} from '../controllers/Controller.js'

const router = express.Router()

router.get('/', getUsuarios)
router.get('/:id', getUsuario)
router.post('/', createUsuarios)
router.put('/:id',updateUsuarios)
router.delete('/:id', deleteUsuarios)

export default router;

