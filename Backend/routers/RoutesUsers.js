import express from "express"
import { verifyUser, adminOnly } from "../middleware/VerifyAuth.js"
import  {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/users.js"

const router = express.Router()
router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/',createUser)
router.put('/:id',updateUser)
router.delete('/:id', deleteUser)

export default router