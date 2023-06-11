import ModelsUser from "../models/ModelsUser.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
    const user = await ModelsUser.findOne({
        where: {
            username: req.body.username,
        }
    })

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" })
    const match = await argon2.verify(user.password, req.body.password)

    if (!match) return res.status(400).json({ message: "Contraseña incorrecta" })

    req.session.userId = user.identifier
    const identifier = user.identifier
    const username = user.username
    const nombre = user.nombre
    const apellido_paterno = user.pellido_paterno
    const apellido_materno = user.pellido_materno
    const role = user.role


    res.status(200).json({ identifier, username, nombre, apellido_paterno,apellido_materno, role })
}

export const Me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Por favor, ingrese a su cuenta" });
    }
    const user = await ModelsUser.findOne({
        attributes: ['identifier', 'username','nombre', 'apellido_paterno', 'apellido_materno', 'role' ],
        where: {
            identifier: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ message: "El usuario no existe" });
    res.status(200).json(user);
}

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ message: "Error no se pudo cerrar la sesion" });
        res.status(200).json({ message: "Se cerro la sesion " });
    });
}