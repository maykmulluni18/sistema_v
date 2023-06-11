import ModelsObras from "../models/ModelsObras.js"

export const getObras = async (req, res) => {
    try {
        const obras = await ModelsObras.findAll()
        res.json(obras)

    } catch (error) {
        res.status(400).json( {message: error.message} )
    }

}

export const getObrasID = async (req, res) =>{
    try{
        const obras = await ModelsObras.findOne({
            where:{id:req.params.id}
        })
        console.log(obras.id)
        res.json(obras)
        
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

export const createObras = async (req, res) => {
    try{
        await ModelsObras.create(req.body)
        res.status(200).json({
            "message": "Obra creado con exito.",
        })
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

export const updateObras = async (req, res) => {
    try{
        await ModelsObras.update(req.body,{
            where: {id: req.params.id}
        })
        res.status(200).json({
            "message": "Obra actualizado con exito.",
    })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const deleteObras = async (req, res) => {
    try{
        const id = req.params.id
        const obras = await ModelsObras.destroy({
            where: {id}
        })
        
        console.log(obras)
        res.status(200).json({
            "message":"Obra eliminado con exito"
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}