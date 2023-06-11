import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Layout from "../../../Layout";
import UNAP from "../UNAP.png";
import Swal from 'sweetalert2'
import "./editsede.scss"
import { DB_URL } from '../../../../../config/config';

const URI = DB_URL + 'sedes/'

const EditSede_cont = () => {
    const [cuenta_de_costo, setCuentaDeCosto] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [sede, setSede] = useState('')
    const [responsable, setResponsable] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const updateeSede = async (e) => {
        e.preventDefault()
        try {
            const respon = await axios.put(URI + id, {
                cuenta_de_costo: cuenta_de_costo,
                descripcion: descripcion,
                sede: sede,
                responsable: responsable,
            })
            if (respon.status === 200) {
                Swal.fire(
                    {
                        title: 'Editado con Exito!',
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


    const getSedeId = async () => {
        const resb = await axios.get(URI + id,)
        setCuentaDeCosto(resb.data.cuenta_de_costo)
        setDescripcion(resb.data.descripcion)
        setSede(resb.data.sede)
        setResponsable(resb.data.responsable)
    }
    useEffect(() => {
        getSedeId()
    }, [])
    function mayus(e) {
        e.value = e.value.toUpperCase();
    }
    return (
        <>
            <div className='cont_editar_sedes'>
                <div className="top">
                    <h1>Editar Sedes : {id}</h1>
                </div>
                <div className="cont_form_bienes">
                    <div className="right">
                        <form onSubmit={updateeSede}>
                            <div className="formInput" >
                                <label>CUENTA DE COSTO</label>
                                <input

                                    value={cuenta_de_costo}
                                    onChange={(e) => setCuentaDeCosto(e.target.value)}
                                    type="number"
                                    placeholder="INGRESE UNA CUENTA DE COSTO"
                                    required


                                />
                            </div>
                            <div className="formInput" >
                                <label>DESCRIPCIÓN</label>
                                <input
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder='INGRESE UNA DESCRIPCIÓN'
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
                                    placeholder='INGRESE UNA SEDE'
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
                                    placeholder='INGRESE UN RESPONSABLE'
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

export default EditSede_cont;