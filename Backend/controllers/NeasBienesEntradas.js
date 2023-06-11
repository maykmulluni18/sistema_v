import ModelsBienes from "../models/ModelsBienes.js";
import ModelsNeaBien from "../models/ModelsNeaBien.js";
import ModelsNeaEntradas from "../models/ModelsNeaEntradas.js";

export const getNeasBienesEntradasId = async (req, res) => {
    try {
        const NeasBien = await ModelsNeaBien.findAll({
            where: {neaEntradaId: req.params.id},
            include: [ModelsNeaEntradas, ModelsBienes]
        })
        res.json(NeasBien)
    } catch (error) {
        res.status(400).json({ message : error.message})
    }
}


