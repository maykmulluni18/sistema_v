import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "./editarobras.scss"
import Swal from 'sweetalert2'
import { DB_URL } from '../../../../../config/config';

const URI = DB_URL + 'obras/'

const EditarObras_cont = () => {
    const [obras, setObra] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const updateeObras = async (e) => {
        e.preventDefault()

        try {
            const respon = await axios.put(URI + id, {
                obras: obras,
            })
            if (respon.status === 200) {
                Swal.fire(
                    {
                        title: 'Editado con Exito..',
                        icon: 'success',
                        timer: 5500
                    }
                )
                navigate('/obras')

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


    const getObrastId = async () => {
        const resb = await axios.get(URI + id,)
        setObra(resb.data.obras)
    }
    useEffect(() => {
        getObrastId()
    }, [])

    return (
        <>
            <div className='cont_edit_obras'>
                <div className="top">
                    <h1>Editar un Obras : {id}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={updateeObras}>
                            <div className="formInput" >
                                <label htmlFor='obras'>OBRAS</label>
                                <input
                                    label='obras'
                                    id='obras'
                                    value={obras}
                                    onChange={(e) => setObra(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder=""
                                    required
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
export default EditarObras_cont;