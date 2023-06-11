import ModelsInvenInicial from "../models/ModelsInvenInicial.js"
import ModelsBienes from "../models/ModelsBienes.js"

export const getInventBienes = async (req, res) => {
    try {
        const InventBienes = await ModelsInvenInicial.findAll({
            include: [ModelsBienes]
        })
        res.json(InventBienes)
    } catch (error) {
        res.status(400).json({ message : error.message})
    }
}

export const getInventBienesId = async (req, res) => {
    try {
        const InventBienes = await ModelsInvenInicial.findOne({
            where:{id:req.params.id},
            include: [ModelsBienes]
        })
        res.json(InventBienes)
    } catch (error) {
        res.status(400).json({ message : error.message})
    }
}

export const createInventBienes = async (req, res) => {
    try {
        const InventBienes = await ModelsInvenInicial.create(req.body)
        res.status(200).json({'message': 'Creado con Exito'})
    } catch (error) {
        res.status(400).json({ message : error.message})
    }
}

export const updateInventBienes = async (req, res) => {
    try {
        const InventBienes = await ModelsInvenInicial.update(req.body, {
            where: {id: req.params.id}
        })
        res.status(200).json({'message': 'Actualizado con exito'})
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

export const deleteInventBienes = async (req, res) => {
    try {
        await ModelsInvenInicial.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json({'message': 'Eliminado con exito'})
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}
