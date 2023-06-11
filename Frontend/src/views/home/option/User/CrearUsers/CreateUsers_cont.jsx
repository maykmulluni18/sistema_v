import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
    Box, Button, FormHelperText, Grid,
    Container, Paper, IconButton, InputAdornment,
    TextField, Typography
} from '@mui/material';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
//import InputLabel from '@mui/material/InputLabel';
import "./createusers.scss"
import { DB_URL } from '../../../../../config/config';

const URI = DB_URL + 'createuseradmin/'

const CreateUsers_cont = () => {
    const [values, setValues] = useState({
        usua: "",
        pass: "",
        showPass: false,
    });

    const handlePassVisibilty = () => {
        setValues({
            ...values,
            showPass: !values.showPass,
        });
    };
    const [username, setUserName] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido_paterno, setApellidoPaterno] = useState('')
    const [apellido_materno, setApellidoMaterno] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [msg, setMsg] = useState()
    const navigate = useNavigate()

    const users_admins = async (e) => {
        e.preventDefault();
        try {
            const respon = await axios.post(URI, {
                username: username,
                nombre: nombre,
                apellido_paterno: apellido_paterno,
                apellido_materno: apellido_materno,
                role: role,
                password: password,
                confPassword: confPassword,
            })

            if (respon.status === 200) {
                Swal.fire(
                    {
                        title: 'Creado con Exito..',
                        // text: 'Presione Clik para cerrar!',
                        icon: 'success',
                        timer: 5500
                    }
                )
                navigate('/usuarios-adminstradores')

            } else {
                Swal.fire(
                    {
                        title: 'Error!',
                        // text: 'Presione Clik para cerrar!',
                        icon: 'error',
                        timer: 5500
                    }
                )
            }
        } catch (error) {
            if (error.response.status === 400) {
                Swal.fire(
                    {
                        title: 'Error',
                        text: error.response.data.message,
                        icon: 'error',
                        timer: 8500
                    }
                )
            }
        }
    }

    /*Calenadrio modal*/
    return (
        <>
            <div className='cont_crear_users'>
                <div className="top">
                    <h1>Crear una Usuario</h1>
                </div>
                <div className="cont_form_bienes">
                    <div className="right">
                        <p className="has-text-centered">alert: {msg}</p>

                        <form onSubmit={users_admins}>
                            <div className="formInput" >
                                <label htmlFor='username'>NOMBRE DE USUARIO</label>
                                <input
                                    label="username"
                                    id='username'
                                    role='username'
                                    value={username}
                                    name='username'
                                    onChange={(e) => setUserName(e.target.value)}
                                    type="text"
                                    placeholder=""
                                    required
                                />
                            </div>
                            <div className="formInput" >
                                <label>Nombre</label>
                                <input
                                    value={nombre}
                                    name='name'
                                    onChange={(e) => setNombre(e.target.value)}
                                    type="text"
                                    placeholder=''
                                    required
                                //pattern="[A-Z-0-9]+"
                                />
                            </div>

                            <div className="formInput" >
                                <label>APELLIDO PATERNO</label>
                                <input
                                    value={apellido_paterno}
                                    name='apellido_paterno'
                                    onChange={(e) => setApellidoPaterno(e.target.value)}
                                    type="text"
                                    placeholder=''
                                    required
                                //pattern="[A-Z-0-9]+"
                                />

                            </div>
                            <div className="formInput" >
                                <label>APELLIDO MATERNO</label>
                                <input
                                    value={apellido_materno}
                                    name='apellido_materno'
                                    onChange={(e) => setApellidoMaterno(e.target.value)}
                                    type="text"
                                    placeholder=''
                                    required
                                //pattern="[A-Z-0-9]+"
                                />

                            </div>
                            <div className="formInput" >
                                <label>Rol</label>
                                <Select
                                    name='role'
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    className="selecrole"
                                    //labelId="demo-simple-select-label"
                                    //id="demo-simple-select"
                                    value={role}
                                    label="role"
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder=""
                                    required
                                >
                                    <MenuItem value="admin">admin</MenuItem>
                                    <MenuItem value="admin1">admin2</MenuItem>
                                </Select>
                            </div>
                            <div className="formInput" >
                                <label>INGRESAR PASSWORD</label>
                                <TextField
                                    className='password'
                                    type={values.showPass ? "text" : "password"}
                                    fullWidth
                                    variant="outlined"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" className='password_1'>
                                                <IconButton
                                                    onClick={handlePassVisibilty}
                                                    aria-label="toggle password"
                                                    edge="end"
                                                >
                                                    {values.showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div className="formInput" >
                                <label>CONFIRMAR PASSWORD</label>

                                <TextField
                                    className='password'
                                    type={values.showPass ? "text" : "password"}
                                    fullWidth
                                    variant="outlined"
                                    required
                                    name="confPassword"
                                    value={confPassword}
                                    onChange={(e) => {
                                        setConfPassword(e.target.value)
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" className='password_1'>
                                                <IconButton
                                                    onClick={handlePassVisibilty}
                                                    aria-label="toggle password"
                                                    edge="end"
                                                >
                                                    {values.showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div className='crearButtom_B'>
                                <button className='button1' type='submit'>Guardar</button>
                                <Link to={'../'} >
                                    <button className='button2'> Salir</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateUsers_cont;
