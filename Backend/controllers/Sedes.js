import ModelsSedes from "../models/ModelsSedes.js";
export const getSedes = async (req, res) => {
    try {
        const sedes = await ModelsSedes.findAll()
        res.json(sedes)

    } catch (error) {
        res.status(400).json( {message: error.message} )
    }

}


export const getSedesID = async (req, res) =>{
    try{
        const sedes = await ModelsSedes.findAll({
            where:{id:req.params.id}
        })
        res.json(sedes[0])
        
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

export const createSedes = async (req, res) => {
    try{
        await ModelsSedes.create(req.body)
        res.status(200).json({
            "message": "Sede creado con exito.",
        })
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

export const updateSedes = async (req, res) => {
    try{
        await ModelsSedes.update(req.body,{
            where: {id: req.params.id}
        })
        res.status(200).json({
            "message": "Sedes actualizado con exito.",
    })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const deleteSedes = async (req, res) => {
    try{
        await ModelsSedes.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json({
            "message":"Sede eliminado con exito"
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}