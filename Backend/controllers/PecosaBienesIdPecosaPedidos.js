import ModelsPecosaBienes from "../models/ModelsPecosaBienes.js";
import ModelsPecosaPedidos from "../models/ModelsPecosaPedidos.js";
import ModelsInvenInicial from "../models/ModelsInvenInicial.js";
import ModelsNeaBien from "../models/ModelsNeaBien.js";
import ModelsBienes from "../models/ModelsBienes.js";

export const getPecosaBienesPeidosId = async (req, res) => {
    try {
        const pecosabienpedidos = await ModelsPecosaBienes.findAll({
            where: { pecosaPedidoId: req.params.id },
            include: [{
                model: ModelsInvenInicial,
                include: [ModelsBienes]
            },
            {
                model: ModelsNeaBien,
                include: [ModelsBienes]
            },
                ModelsPecosaPedidos]
        })


        res.json(pecosabienpedidos)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}



