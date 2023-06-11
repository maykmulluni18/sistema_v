import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../../../Layout';
//import InputLabel from '@mui/material/InputLabel';


import "./createsedes.scss"
import { DB_URL } from '../../../../../config/config';

const URI = DB_URL + 'sedes/'

const CreateSedes_cont = () => {
    const [sedes, setSedes] = useState([])


    const [cuenta_de_costo, setCuentaDeCosto] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [sede, setSede] = useState('')
    const [responsable, setResponsable] = useState('')

    const navigate = useNavigate()

    const Sedes = async (e) => {
        e.preventDefault();
        try {
            const respon = await axios.post(URI, {
                cuenta_de_costo: cuenta_de_costo,
                descripcion: descripcion,
                sede: sede,
                responsable: responsable,
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
                navigate('/sedes')

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

    const mayusculas = (e) => {
        e.value = e.value.toUpperCase();
    }

    /*Calenadrio modal*/
    return (
        <>
            <div className='cont_crear_sedes'>
                <div className="top">
                    <h1>Crear una Sede</h1>
                </div>
                <div className="cont_form_bienes">
                    <div className="right">
                        <form onSubmit={Sedes}>
                            <div className="formInput" >
                                <label>CUENTA DE COSTO</label>
                                <input

                                    value={cuenta_de_costo}
                                    onChange={(e) => setCuentaDeCosto(e.target.value)}
                                    type="number"
                                    placeholder=""
                                    required


                                />
                            </div>
                            <div className="formInput" >
                                <label>DESCRIPCIÓN</label>
                                <input
                                    value={descripcion.toUpperCase()}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    type="text"
                                    placeholder=''
                                    required
                                //pattern="[A-Z-0-9]+"
                                />
                            </div>

                            <div className="formInput" >
                                <label>SEDE</label>
                                <input
                                    value={sede}
                                    onChange={(e) => setSede(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder=''
                                    required
                                //pattern="[A-Z-0-9]+"
                                />

                            </div>
                            <div className="formInput" >
                                <label>RESPONSABLE</label>
                                <input
                                    value={responsable}
                                    onChange={(e) => setResponsable(e.target.value.toUpperCase())}
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

export default CreateSedes_cont;
