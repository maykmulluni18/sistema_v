import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "./editaralmacen.scss"
import Swal from 'sweetalert2'
import { DB_URL } from '../../../../../config/config';

const URI = DB_URL + 'almacen/'

const EditarAlmacen_cont = () => {
    const [almacen, setAlmacen] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const updateeAlmacen = async (e) => {
        e.preventDefault()
        try {
            const respon = await axios.put(URI + id, {
                almacen: almacen,
            })
            if (respon.status === 200) {
                Swal.fire(
                    {
                        title: 'Editado con Exito..',
                        icon: 'success',
                        timer: 5500
                    }
                )
                navigate('/almacenes')

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


    const geAlmacentId = async () => {
        const resb = await axios.get(URI + id,)
        setAlmacen(resb.data.almacen)
    }
    useEffect(() => {
        geAlmacentId()
    }, [])

    return (
        <>
            <div className='cont_edit_almacen'>
                <div className="top">
                    <h1>Editar un Almacen : {id}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={updateeAlmacen}>
                            <div className="formInput" >
                                <label htmlFor='alnacen'>ALMACEN</label>
                                <input
                                    label='almacen'
                                    id='almacen'
                                    value={almacen}
                                    onChange={(e) => setAlmacen(e.target.value.toUpperCase())}
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
export default EditarAlmacen_cont;