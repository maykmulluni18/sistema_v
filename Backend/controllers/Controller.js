import Models from "../models/Models.js";

//Mostrar datos
export const getUsuarios = async (req, res)=>{
    try{
        const usuarios = await Models.findAll()
        res.json(usuarios)
    } catch (error){
        res.status(400).json({message: error.message})
    }
}
//Mostrar registro
export const getUsuario = async (req, res) =>{
    try{
        const usuarios = await Models.findAll({
            where:{id:req.params.id}
        })
        res.json(usuarios[0])
        
    } catch (error){
        res.status(400).json({message: error.message})
    }
}
//Crear
export const createUsuarios = async (req, res) => {
    try{
        await Models.create(req.body)
        res.status(200).json({
            "message": "Usuario creado con exito.",
        })
    } catch (error){
        res.status(400).json({message: error.message})
    }
}
//Actualizar
export const updateUsuarios = async (req, res) => {
    try{
        await Models.update(req.body,{
            where: {id: req.params.id}
        })
        res.status(200).json({
            "message": "Usuario actualizado con exito.",
    })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
//Eliminar
export const deleteUsuarios = async (req, res) => {
    try{
        await Models.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json({
            "message":"Usuario eliminado con exito"
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}