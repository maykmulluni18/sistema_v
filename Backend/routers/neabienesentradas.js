import express  from "express";
import { getNeasBienesEntradasId } from "../controllers/NeasBienesEntradas.js";

const router = express.Router();

router.get("/:id", getNeasBienesEntradasId)

export default router