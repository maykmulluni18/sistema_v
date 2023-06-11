import ModelsNeaBien from "../models/ModelsNeaBien.js";
import ModelsBienes from "../models/ModelsBienes.js";
import ModelsNeaEntradas from "../models/ModelsNeaEntradas.js";

export const getNeasBienes = async (req, res) => {
    try {
        const NeasBienes = await ModelsNeaBien.findAll({
            include: [ModelsNeaEntradas, ModelsBienes]
        })
        res.json(NeasBienes)
    } catch (error) {
        res.status(400).json({ message : error.message})
    }
}

export const getNeasBienesId = async (req, res) => {
    try {
        const NeasBienes = await ModelsNeaBien.findAll({
            where: {id: req.params.id},
            include: [ModelsNeaEntradas, ModelsBienes]
        })
        res.json(NeasBienes[0])
    } catch (error) {
        res.status(400).json({ message : error.message})
    }
}

export const createNeasBienes = async (req, res) => {
    try {
        const NeasBienes = await ModelsNeaBien.create(req.body)
        res.status(200).json({'message': 'Neas Bien Creado con Exito'})
    } catch (error) {
        res.status(400).json({ message : error.message})
    }
}

export const updateNeasBienes = async (req, res) => {
    try {
        const NeasBienes = await ModelsNeaBien.update(req.body, {
            where: {id: req.params.id}
        })
        res.status(200).json({'message': 'Neas Bien Actualizado con exito'})
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

export const deleteNeasBienes = async (req, res) => {
    try {
        await ModelsNeaBien.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json({'message': 'Neas Bien Eliminado con exito'})
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}
