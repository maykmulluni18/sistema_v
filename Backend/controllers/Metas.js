import Metas from "../models/ModelsMetas.js"
import Models from "../models/Models.js"


export const getMetas = async (req, res) => {
    try {
        const metas = await Metas.findAll({
            include:[Models]
        })
        res.json(metas)

    } catch (error) {
        res.json( {message: error.message} )
    }

}

export const getMetasID = async (req, res) =>{
    try{
        const metas = await Metas.findAll({
            where:{id:req.params.id}
        })
        res.json(metas[0])
        
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

export const createMetas = async (req, res) => {
    try{
        await Metas.create(req.body)
        res.status(200).json({
            "message": "Meta creado con exito.",
        })
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

export const updateMetas = async (req, res) => {
    try{
        await Metas.update(req.body,{
            where: {id: req.params.id}
        })
        res.status(200).json({
            "message": "Meta actualizado con exito.",
    })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const deleteMetas = async (req, res) => {
    try{
        await Metas.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json({
            "message":"Meta eliminado con exito"
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}