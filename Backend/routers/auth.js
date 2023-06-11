import express from "express"

import { Login, logOut, Me} from "../controllers/auth.js"

const router = express.Router()

router.get('/', Me)
router.post('/', Login)
router.delete('/', logOut)

export default router;
