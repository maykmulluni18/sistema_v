import ModelsUser from "../models/ModelsUser.js"
import argon2 from "argon2"

export const getUsers = async (req, res) => {
    try {
        const respon = await ModelsUser.findAll({
            attributes: ['id','identifier', 'username', 'nombre', 'apellido_paterno', 'apellido_materno', 'role']
        });
        res.status(200).json(respon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const respon = await ModelsUser.findOne({
            attributes: ['identifier', 'username', 'nombre', 'apellido_paterno', 'apellido_materno', 'role'],
            where: {
                identifier: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    const { username, nombre, apellido_paterno, apellido_materno, role, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({ message: "La contraseña no coincide" });
    const hashPassword = await argon2.hash(password);
    try {
        await ModelsUser.create({
            username: username,
            nombre: nombre,
            apellido_paterno: apellido_paterno,
            apellido_materno: apellido_materno,
            role: role,
            password: hashPassword

        });
        res.status(200).json({ message: "Se registro exitosamente" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const user = await ModelsUser.findOne({
        where: {
            identifier: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    const { username, nombre, apellido_paterno, apellido_materno, role, password, confPassword } = req.body;
    let hashPassword;
    if (password === "" || password === null) {
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password);
    }
    if (password !== confPassword) return res.status(400).json({ message: "La contraseña no coincide" });
    try {
        await ModelsUser.update({
            username: username,
            nombre: nombre,
            apellido_paterno: apellido_paterno,
            apellido_maternos: apellido_materno,
            role: role,
            password: hashPassword

        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({ message: "Usuario actualizado" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
export const deleteUser = async (req, res) => {
    try{
        await ModelsUser.destroy({
            where: {id: req.params.id}
        })
        res.json({
            "message":"Sede eliminado con exito"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

/*export const deleteUser = async (req, res) => {
    const user = await ModelsUser.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!user) return res.status(404).json({ message: "El usuario no existe" });
    try {
        await ModelsUser.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ message: "Usuario eliminado" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}*/