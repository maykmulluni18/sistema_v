import ModelsAlmacen from "../models/ModelsAlmacen.js"

export const getAlmacen = async (req, res) => {
    try {
        const almacen = await ModelsAlmacen.findAll()
        res.json(almacen)

    } catch (error) {
        res.status(400).json( {message: error.message} )
    }

}

export const getAlmacenID = async (req, res) =>{
    try{
        const almacen = await ModelsAlmacen.findOne({
            where:{id:req.params.id}
        })
        res.json(almacen)
        
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

export const createAlmacen = async (req, res) => {
    try{
        await ModelsAlmacen.create(req.body)
        res.status(200).json({
            "message": "Almacen creado con exito.",
        })
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

export const updateAlmacen = async (req, res) => {
    try{
        await ModelsAlmacen.update(req.body,{
            where: {id: req.params.id}
        })
        res.status(200).json({
            "message": "Almacen actualizado con exito.",
    })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const deleteAlmacen = async (req, res) => {
    try{
        await ModelsAlmacen.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json({
            "message":"Almacen eliminado con exito"
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}