import React, { useState } from 'react';
//import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./createnew.scss"
import { DB_URL } from '../../../../../config/config';

const URI = DB_URL + 'user/'

const CreateAdministrativos_cont = () => {

    //const [n_documento, setNdocumento] = useState('')
    const [apellido_paterno, setApellidopaterno] = useState('')
    const [apellido_materno, setApellidomaterno] = useState('')
    const [nombres, setNombres] = useState('')
    const navigate = useNavigate()

    const Administrativos = async (e) => {
        e.preventDefault();
        try {
            const respon = await axios.post(URI, {
                //n_documento: n_documento,
                apellido_paterno: apellido_paterno,
                apellido_materno: apellido_materno,
                nombres: nombres
            })
            if (respon.status === 200) {
                Swal.fire(
                    {
                        title: 'Creeado con Exito!',
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


    /*Calenadrio modal*/
    return (
        <>
            <div className='cont_crear_administrativos'>
                <div className="top">
                    <h1>Crear Usuarios de Administrativos </h1>
                </div>
                <div className="cont_form_bienes">
                    <div className="right">
                        <form onSubmit={Administrativos}>
                            {/* 
                            <div className="formInput" >
                                <label htmlFor='inputDocumento'>Documento</label>
                                <input

                                    value={n_documento}
                                    id='inputDocumento'
                                    onChange={(e) => setNdocumento(e.target.value)}
                                    type="number"
                                    placeholder=""
                                    required


                                />
                                
                            </div>
                            */}
                            <div className="formInput" >
                                <label htmlFor='inputNombres'>NOMBRES</label>
                                <input
                                    value={nombres}
                                    id='inputNombres'
                                    onChange={(e) => setNombres(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder=''
                                    required
                                //pattern="[A-Z-0-9]+"
                                />

                            </div>

                            <div className="formInput" >
                                <label htmlFor='inputApellidoPaterno'>APELLIDOS PATERNO</label>
                                <input
                                    value={apellido_paterno}
                                    id='inputApellidoPaterno'
                                    onChange={(e) => setApellidopaterno(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder=''
                                    required
                                //pattern="[A-Z-0-9]+"
                                />
                            </div>
                            <div className="formInput" >
                                <label htmlFor='inputApellidoMaterno'>APELLIDOS MATERNO</label>
                                <input
                                    value={apellido_materno}
                                    id='inputApellidoMaterno'
                                    onChange={(e) => setApellidomaterno(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder=''
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

export default CreateAdministrativos_cont;
