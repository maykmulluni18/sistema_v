import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./createbienes.scss"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2'
import { DB_URL } from '../../../../../config/config';

const URI = DB_URL + 'bienes/'

const Medida = [
    { id: 1, medida: 'Pulgada cúbica (in³)' },
    { id: 2, medida: 'Pie cúbico(ft³)' },
    { id: 3, medida: 'Metro cúbico(m³)' },
    { id: 4, medida: 'Decámetro(dam)' },
    { id: 5, medida: 'Hectómetro(hm)' },
    { id: 6, medida: 'Decímetro(dm)' },
    { id: 7, medida: 'Centímetro(cm)' },
    { id: 8, medida: 'Milímetro(mm)' },
    { id: 9, medida: 'Micrómetro(µm)' },
    { id: 10, medida: 'Nanómetro(nm)' },
    { id: 11, medida: 'Angstrom(Å)' },
    { id: 12, medida: 'Años luz(ly)' },
    { id: 13, medida: 'Legua(lea)' },
    { id: 14, medida: 'Millas(mi)' },
    { id: 15, medida: 'Kilómetro(km)' },
    { id: 16, medida: 'Metro(m)' },
    { id: 17, medida: 'Yarda(yd)' },
    { id: 18, medida: 'Pie(ft)' },
    { id: 19, medida: 'Pulgada(in)' },
    { id: 20, medida: 'Yarda cúbica (yd³)' },
    { id: 21, medida: 'Litro (L)' },
    { id: 22, medida: 'Metro cúbico (m³)' },
    { id: 23, medida: 'Centímetro cúbico (cm³)' },
    { id: 24, medida: 'Pulgada cúbica (in³)' },
    { id: 25, medida: 'Galón (gal)' },
    { id: 26, medida: 'Pinta (pt)' },
    { id: 27, medida: 'Onza líquida (oz)' },
    { id: 28, medida: 'Barril (bbl)' },
    { id: 29, medida: 'Cucharada (tbsp)' },
    { id: 30, medida: 'Cucharadita (tsp)' },
    { id: 31, medida: 'Pinta estadounidense (US pt)' },
    { id: 32, medida: 'Galón estadounidense (US gal)' },
    { id: 33, medida: 'Bushel (bu)' },
    { id: 34, medida: 'Peck (pk)' },
    { id: 35, medida: 'Cuarto (qt)' },
    { id: 36, medida: 'Decimetro cubico (dm³)' },
    { id: 37, medida: 'Acre-pie (ac-ft)' },
    { id: 38, medida: 'Barril de petróleo (bbl)' },
    { id: 39, medida: 'Centilitro (cl)' },
    { id: 40, medida: 'Decilitro (dl)' },
    { id: 41, medida: 'Hectolitro (hl)' },
    { id: 42, medida: 'Kilolitro (kl)' },
    { id: 43, medida: 'Litro sistema métrico (L)' },
    { id: 44, medida: 'Metro cúbico sistema métrico (m³)' },
    { id: 45, medida: 'Microlitro (µL)' },
    { id: 46, medida: 'Mililitro (mL)' },
    { id: 47, medida: 'Pinta imperial (pt)' },
    { id: 48, medida: 'Pinta estadounidense (US pt)' },
    { id: 49, medida: 'Yarda cúbica (yd³)' },
    { id: 50, medida: 'Kilogramo (kg)' },
    { id: 51, medida: 'Gramo (g)' },
    { id: 52, medida: 'Miligramo (mg)' },
    { id: 53, medida: 'Tonelada (t)' },
    { id: 54, medida: 'Onza (oz)' },
    { id: 55, medida: 'Libra (lb)' },
    { id: 56, medida: 'Tonelada métrica (t)' },
    { id: 57, medida: 'Quintal (q)' },
    { id: 58, medida: 'Stone (st)' },
    { id: 59, medida: 'Libras del sistema inglés (lbs)' },
    { id: 60, medida: 'Onzas del sistema inglés (oz)' },
    { id: 61, medida: 'Toneladas cortas del sistema inglés (short ton)' },
    { id: 62, medida: 'Toneladas largas del sistema inglés (long ton)' },
    { id: 63, medida: 'Microgramo (µg)' },
    { id: 64, medida: 'Nanogramo (ng)' },
    { id: 65, medida: 'Carat (ct)' },
    { id: 66, medida: 'Centigramo (cg)' },
    { id: 67, medida: 'Decigramo (dg)' },
    { id: 68, medida: 'Dekagramo (dag)' },
    { id: 69, medida: 'Hectogramo (hg)' },
    { id: 70, medida: 'Megagramo (Mg)' },
    { id: 71, medida: 'Microgramo (µg)' },
    { id: 72, medida: 'Punto (dwt)' },
    { id: 73, medida: 'Picogramo (pg)' },
    { id: 74, medida: 'Scruple (s.ap)' },
    { id: 75, medida: 'Tola' },
    { id: 76, medida: 'Tonelada corta (t)' },
    { id: 77, medida: 'Tonelada larga (t)' },
    { id: 78, medida: 'Tonelada métrica (t)' },
    { id: 79, medida: 'Tonelada métrica (t)' },
    { id: 80, medida: 'Millar' },

];

const CreatedBienes_cont = () => {
    /*const [bienes, setBienes] = useState([])
    const [item, setItem] = useState('')
    const [description, setDescription] = useState('')
    const [unidad_de_medida, setUnidadDeMedida] = useState('')
    */
    const navigate = useNavigate()
    const [detailss, setDetaills] = useState([{
        item: "",
        description: "",
        marca: "",
        unidad_de_medida: "",
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

    const Bienes = async (event) => {
        event.preventDefault();
        try {
            for (let i = 0; i < detailss.length; i++) {
                const respon = await axios.post(URI,
                    {
                        item: detailss[i].item,
                        description: detailss[i].description.toUpperCase(),
                        marca: detailss[i].marca,
                        unidad_de_medida: detailss[i].unidad_de_medida,
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
                    navigate('/bienes')
                }
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
    const handleAdd = () => {
        setDetaills([...detailss, {
            item: "",
            description: "",
            marca: "",
            unidad_de_medida: "",
        }])
    }

    const handleRemove = (item) => {
        const list = [...detailss]
        list.splice(item, 1)
        setDetaills(list)
    }
    return (
        <div className='cont_crear_bien'>
            <div className="top">
                <h1>Crear un Bien o Producto </h1>
            </div>
            <div className="cont_form_bienes">
                <div className="right">
                    <form onSubmit={Bienes}>
                        {
                            detailss.map((valu_cont, index) => (
                                <div key={index} className="gen_fromImput">
                                    <div className="prin_formImput">
                                        <p>La insercion multiple solo esta permitido 10 de : {index + 1}</p>
                                        <div className="formInput" >

                                            <label htmlFor='item'>CODIGO</label>
                                            <input
                                                id="item"
                                                value={valu_cont.item}
                                                name='item'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="text"
                                                placeholder="INGRESE UN CODIGO"
                                                required


                                            />
                                        </div>
                                        <div className="formInput" >
                                            <label htmlFor='description'>DESCRIPCION</label>
                                            <input
                                                id='description'
                                                value={valu_cont.description}
                                                name='description'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="text"
                                                placeholder='INGRESE UNA DESCRIPCIÓN'
                                                required
                                            //pattern="[A-Z-0-9]+"
                                            />

                                        </div>
                                        <div className="formInput" >

                                            <label htmlFor='marca'>MARCA</label>
                                            <input
                                                id="marca"
                                                value={valu_cont.marca}
                                                name='marca'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="text"
                                                placeholder=""
                                                //required


                                            />
                                        </div>
                                        <div className="formInput" >
                                            <label htmlFor='unidad_de_medida'>U. DE MEDIDA</label>

                                            <input
                                                type="text"
                                                list="data1m"
                                                name='unidad_de_medida'
                                                value={valu_cont.unidad_de_medida}
                                                label="Medida"
                                                onChange={(e) => handleSubmit(e, index)}
                                                placeholder=""
                                                //required
                                            />
                                            <datalist className='datalistm' id="data1m">
                                                {
                                                    Medida
                                                        .map(res => {
                                                            return (
                                                                <option className='options' key={res.id} value={res.medida}>{res.medida}</option>
                                                            )
                                                        })
                                                }
                                            </datalist>
                                        </div>
                                        <div className="crearButtom_input_a">
                                            {detailss.length - 1 === index && detailss.length < 10 &&
                                                (
                                                    <button type='button' className="buttonA"
                                                        onClick={handleAdd}
                                                    >
                                                        <span>Agregar Mas</span>
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

export default React.memo(CreatedBienes_cont);          