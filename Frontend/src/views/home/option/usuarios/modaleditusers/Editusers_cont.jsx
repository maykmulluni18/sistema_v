import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Layout from "../../../Layout";
import UNAP from "./UNAP.png";
import Swal from 'sweetalert2'

import "./editusers.scss"
import { DB_URL } from '../../../../../config/config';

const URI = DB_URL + 'user/'

const Editusers_cont = () => {
    //const [n_documento, setNdocumento] = useState('')
    const [apellido_paterno, setApellidopaterno] = useState('')
    const [apellido_materno, setApellidomaterno] = useState('')
    const [nombres, setNombres] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const updateAdministrativos = async (e) => {
        e.preventDefault()
        try {
            const respon = await axios.put(URI + id, {

                //n_documento: n_documento,
                apellido_paterno: apellido_paterno,
                apellido_materno: apellido_materno,
                nombres: nombres,
            })
            if (respon.status === 200) {
                Swal.fire(
                    {
                        title: 'Editado con Exito!',
                        icon: 'success',
                        timer: 5500

                    }
                )
                navigate('/administrativos')
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


    const getUsariosId = async () => {
        const res = await axios.get(URI + id,)
        //setNdocumento(res.data.n_documento)
        setApellidopaterno(res.data.apellido_materno)
        setApellidomaterno(res.data.apellido_materno)
        setNombres(res.data.nombres)
    }
    useEffect(() => {
        getUsariosId()
    }, [])

    return (
        <>
            <div className='cont_editar_administrativos'>
                <div className="top">
                    <h1>Editar Usuarios de Administrativos: {id} </h1>
                </div>
                <div className="cont_form_bienes">
                    <div className="right">
                        <form onSubmit={updateAdministrativos}>
                            {/* 
                           <div className="formInput" >
                                <label>DNI</label>
                                <input
                                    value={n_documento}
                                    onChange={(e) => setNdocumento(e.target.value)}
                                    type="number"
                                    placeholder="INGRESE UN DOCUMENTO"
                                    required

                                />
                            </div> 
                            */}
                            <div className="formInput" >
                                <label>NOMBRES</label>
                                <input
                                    style={{ textTransform: 'uppercase' }}
                                    value={nombres}
                                    onChange={(e) => setNombres(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder='INGRESE NOMBRE'
                                    required
                                //pattern="[A-Z-0-9]+"
                                />

                            </div>

                            <div className="formInput" >
                                <label>APELLIDOS PATERNO</label>
                                <input
                                    style={{ textTransform: 'uppercase' }}
                                    value={apellido_paterno}
                                    onChange={(e) => setApellidopaterno(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder='INGRESE APELLIDO PATERNO'
                                    required
                                //pattern="[A-Z-0-9]+"
                                />
                            </div>
                            <div className="formInput" >
                                <label>APELLIDOS MATERNO</label>
                                <input
                                    style={{ textTransform: 'uppercase' }}
                                    value={apellido_materno}
                                    onChange={(e) => setApellidomaterno(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder='INGRESE APELLIDO PATERNO'
                                    required
                                //pattern="[A-Z-0-9]+"
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

export default Editusers_cont;