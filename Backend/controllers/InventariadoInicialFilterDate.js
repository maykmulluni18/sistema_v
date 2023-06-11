import ModelsBienes from "../models/ModelsBienes.js"
import ModelsInvenInicial from "../models/ModelsInvenInicial.js"
export const getInventFilterDataId = async (req, res) => {
    try {
        const InventBienes = await ModelsInvenInicial.findAll({
            where:{fecha_registro: req.params.id},
            include: [ModelsBienes]
        })
        res.json(InventBienes)
    } catch (error) {
        res.status(400).json({ message : error.message})
    }
}

