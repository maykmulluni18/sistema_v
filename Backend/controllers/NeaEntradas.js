import ModelsNeaEntradas from "../models/ModelsNeaEntradas.js";
import ModelsAdministrdores from "../models/Models.js";
//import ModelsSedes from "../models/ModelsSedes.js";
//import ModelsAlmacen from "../models/ModelsAlmacen.js";
//import ModelsObras from "../models/ModelsObras.js";
import ModelsNeaBien from "../models/ModelsNeaBien.js";
import ModelsMetas from "../models/ModelsMetas.js";

export const getNeaEntradas = async (req, res) => {
    try {
        const modelsentradas = await ModelsNeaEntradas.findAll({
            include: [ModelsNeaBien, ModelsAdministrdores,  {
                model: ModelsMetas,
                include: [ModelsAdministrdores]
            },],
        })
        res.json(modelsentradas)
    }catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const getNeaEntradasId = async (req, res) => {
    try {
        const NeasEntradas = await ModelsNeaEntradas.findAll({
            where: {id: req.params.id},
            include: [ModelsNeaBien, ModelsAdministrdores, ModelsMetas]
        })
        res.json(NeasEntradas[0])
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const createNeasEntradas = async (req, res) => {
    try {
        const NeasEntradas = await ModelsNeaEntradas.create(req.body)
        res.status(200).json({'message':'Neas Entradas creado con exito'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const updateNeasEntradas = async (req, res) => {
    try {
        const NeasEntradas = await ModelsNeaEntradas.update(req.body,{
            where: {id: req.params.id}
        })
        res.status(200).json({'message':'Neas Entradas Actualizado creado con exito'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const deleteNeasEntradas = async (req, res) => {
    try {
        const NeasEntradas = await ModelsNeaEntradas.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json({'message': 'Neas Entradas Eliminado con exito'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}