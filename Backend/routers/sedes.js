import express from "express"
import { getSedes,
    getSedesID,
    createSedes,
    updateSedes,
    deleteSedes,

} from "../controllers/Sedes.js"
import { verifyUser } from "../middleware/VerifyAuth.js"

const router = express.Router()

router.get('/', verifyUser, getSedes)
router.get('/:id', getSedesID)
router.post('/', createSedes)
router.put('/:id', updateSedes)
router.delete('/:id', deleteSedes)

export default router
