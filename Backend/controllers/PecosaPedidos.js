import ModelsPecosaPedidos from "../models/ModelsPecosaPedidos.js";
import ModelsAdministrativos from "../models/Models.js";
import ModelsSedes from "../models/ModelsSedes.js";
import ModelsPecosaBienes from "../models/ModelsPecosaBienes.js";
import ModelsMetas from "../models/ModelsMetas.js";
import ModelsInvenInicial from "../models/ModelsInvenInicial.js";
import ModelsNeaBien from "../models/ModelsNeaBien.js";

export const getPecosaPedidos = async(req, res)=>{
    try {
        const pecosapedidos = await ModelsPecosaPedidos.findAll({
            include: [ModelsAdministrativos, ModelsInvenInicial, ModelsPecosaBienes, ModelsMetas],
        })
        res.json(pecosapedidos)
    } catch (error) {
        res.status(400).json({message: error.message})
        
    }
} 

export const getPecosaPedidosId = async(req, res) => {
    try {
        const pecosapedido = await ModelsPecosaPedidos.findAll({
            where: {id: req.params.id},
            include: [ModelsAdministrativos ,ModelsAdministrativos ,ModelsInvenInicial, ModelsMetas]
        })
        res.json(pecosapedido[0])
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


export const createPecosaPedidos = async(req, res) => {
    try {
        await ModelsPecosaPedidos.create(req.body)
        res.status(200).json({'message':'Pecosa Pedidos creado con exito'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const updatePecosaPedidos = async(req, res) => {
    try {
        const pecosapedidos = await ModelsPecosaPedidos.update(req.body,{
            where: {id: req.params.id}
        })
        res.status(200).json({'message':'Pecosa pedidos actualizado con exito'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const deletePecosaPedidos = async(req, res) => {
    try {
        const pecosapedidos = await ModelsPecosaPedidos.destroy({
            where: {id: req.params.id}
        })
        res.json({'message':'Pecosa pedidos eliminado con exito'})
    } catch (error) {
        res.json({message: error.message}) 
    }
}