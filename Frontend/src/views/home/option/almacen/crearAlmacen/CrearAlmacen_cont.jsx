import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./crearalmacen.scss"
import Swal from 'sweetalert2'
import { DB_URL } from '../../../../../config/config';
const URI = DB_URL + 'almacen/'

const CrearAlmacen_cont = () => {

    const navigate = useNavigate()
    const [detailss, setDetaills] = useState([{
        almacen: "",
    },
    ])
    for (let i = 0; i < detailss.length; i++) {
        console.log(i)
    }
    const handleSubmit = (event, index) => {
        const { name, value } = event.target
        const list = [...detailss]
        list[index][name] = value
        setDetaills(list)

        /*setDetaills((prev) => {
            return { ...prev, [name]: value };
        });*/
    }

    const Almacen = async (event) => {
        event.preventDefault();
        try {
            for (let i = 0; i < detailss.length; i++) {
                const respon = await axios.post(URI,
                    {
                        almacen: detailss[i].almacen,
                    },

                )
                if (respon.status === 200) {
                    Swal.fire(
                        {
                            title: 'Creado con Exito..',
                            // text: 'Presione Clik para cerrar!',
                            icon: 'success',
                            timer: 5500
                        }
                    )
                    navigate('/almacenes')
                } 
            }
        } catch (error){
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
    const handleAdd = () => {
        setDetaills([...detailss, {
            almacen: "",
        }])
    }

    const handleRemove = (item) => {
        const list = [...detailss]
        list.splice(item, 1)
        setDetaills(list)
    }
    return (
        <div className='cont_crear_almacen'>
            <div className="top">
                <h1>Crear un Almacen </h1>
            </div>
            <div className="cont_form_almacen">
                <div className="right">
                    <form onSubmit={Almacen}>
                        {
                            detailss.map((valu_cont, index) => (
                                <div key={index} className="gen_fromImput">
                                    <div className="prin_formImput">
                                        <p>La insercion multiple solo esta permitido 10 de : {index + 1}</p>
                                        <div className="formInput" >

                                            <label htmlFor='almacen'>NOMBRE DE ALMACEN</label>
                                            <input
                                                id="almacen"
                                                value={valu_cont.almacen.toUpperCase()}
                                                name='almacen'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="text"
                                                placeholder=""
                                                required


                                            />
                                        </div>

                                        <div className="crearButtom_input_a">
                                            {detailss.length - 1 === index && detailss.length < 10 &&
                                                (
                                                    <button type='button' className="buttonA"
                                                        onClick={handleAdd}
                                                    >
                                                        <span>Agregar</span>
                                                    </button>
                                                )}
                                        </div>

                                    </div>
                                    <div className="crearButtom_input_b">
                                        {detailss.length > 1 &&
                                            (

                                                <button type='button' className="buttonR"
                                                    onClick={() => handleRemove(index)}>
                                                    <span>Remover</span>
                                                </button>

                                            )
                                        }
                                    </div>
                                </div>
                            ))
                        }

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
    );
}

export default CrearAlmacen_cont;          