import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import "./crearpecosabienes.scss"
import { DB_URL } from '../../../../../../config/config';
import { Filter_Obs_Nea } from './filter_obs';
import FilterInventariado from './FilterInventariado';
import FilterNeasBien from './FilterNeasBien';
import { FilterNea_des } from './FilterNea_des';
import { FilterInventario_des } from './FilterInventario_des';
import TextField from '@mui/material/TextField';

import PropTypes from 'prop-types';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import Typography from '@mui/material/Typography';

const URI = DB_URL + 'pecosabienes/'

const URI1 = DB_URL + 'pecosapedidos/'

const URI2 = DB_URL + 'invetinicial/'

const URI3 = DB_URL + 'neasbienes/'


const LISTBOX_PADDING = 20; // px

function renderRow(props) {
    const { data, index, style } = props;
    const dataSet = data[index];
    const inlineStyle = {
        ...style,
        top: style.top + LISTBOX_PADDING,
    };

    if (dataSet.hasOwnProperty('group')) {
        return (
            <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
                {dataSet.group}
            </ListSubheader>
        );
    }

    return (
        <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
            {`#${dataSet[2] + 1} - ${dataSet[1]}`}
        </Typography>
    );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (ref.current != null) {
            ref.current.resetAfterIndex(0, true);
        }
    }, [data]);
    return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData = [];
    children.forEach((item) => {
        itemData.push(item);
        itemData.push(...(item.children || []));
    });

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
        noSsr: true,
    });
    const itemCount = itemData.length;
    const itemSize = smUp ? 46 : 58;

    const getChildSize = (child) => {
        if (child.hasOwnProperty('group')) {
            return 48;
        }

        return itemSize;
    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemSize;
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={other}>
                <VariableSizeList
                    itemData={itemData}
                    height={getHeight() + 2 * LISTBOX_PADDING}
                    width="100%"
                    ref={gridRef}
                    outerElementType={OuterElementType}
                    innerElementType="ul"
                    itemSize={(index) => getChildSize(itemData[index])}
                    overscanCount={5}
                    itemCount={itemCount}
                >
                    {renderRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});

ListboxComponent.propTypes = {
    children: PropTypes.node,
};

function random(length) {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
        boxSizing: 'border-box',
        '& ul': {
            padding: 0,
            margin: 0,
        },
    },
});



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


const CrearPecosaBienes_cont = () => {
    const [pecosapedidos, setPecosaPedidos] = useState([])
    const [fecha, setFecha] = useState([])

    const [bienes, setBienes] = useState([])
    const [neasbien, setNeasdBieneId] = useState([])

    const [error, setError] = useState(false)


    const getPecosaPedidos = async () => {
        const res = await axios.get(URI1)
        setPecosaPedidos(res.data.reverse())
    }

    const getBienes = async () => {
        const res = await axios.get(URI2)
        setBienes(res.data.reverse())
    }
    const getNeasBien = async () => {
        const res = await axios.get(URI3)
        setNeasdBieneId(res.data.reverse())
    }
    useEffect(() => {
        getPecosaPedidos()
        getBienes()
        getNeasBien()
    }, [])

    const navigate = useNavigate()
    const [detailsspecosabienes, setDetaillsPecosaBienes] = useState([{
        pecosaPedidoId: "",
        inventaridoInicialId: "",
        nea_bien_id: "",
        descripcion: "",
        cantidad: "",
        medida:"",
        observaciones: "INVENTARIADO",
        fecha: "",

    }])
    const handleSubmit = (event, index) => {
        const { name, value } = event.target
        const list = [...detailsspecosabienes]
        list[index][name] = value
        setDetaillsPecosaBienes(list)
    }
    const handleSubmit1 = (name, value, index) => {
        const list = [...detailsspecosabienes]
        list[index][name] = value
        setDetaillsPecosaBienes(list)
    }
    const [pecosaPedidoId, setPecosaPedidosId] = useState('')
    const Pecosa_Bien = async (e) => {

        e.preventDefault();
        try {
            for (let i = 0; i < detailsspecosabienes.length; i++) {
                const respon = await axios.post(URI, {
                    pecosaPedidoId: pecosaPedidoId,
                    inventaridoInicialId: detailsspecosabienes[i].inventaridoInicialId || null,
                    nea_bien_id: detailsspecosabienes[i].nea_bien_id || null,
                    descripcion: detailsspecosabienes[i].descripcion || null,
                    cantidad: detailsspecosabienes[i].cantidad,
                    medida: detailsspecosabienes[i].medida,
                    observaciones: detailsspecosabienes[i].observaciones,
                    fecha: fecha,
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
                    navigate('/pecosa-bienes')
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


            }
        } catch (error) {
            console.log(error.response.status)
            setError(error.response.data.message)
            if (error.response.status == 500) {
                Swal.fire(
                    {
                        title: 'Error',
                        text: error.response.data.message,
                        icon: 'error',
                        timer: 8500
                    }
                )
            }
            if (error.response.status === 400 || error.response.status === 404) {
                Swal.fire(
                    {
                        title: error.response.data.message,
                        icon: 'warning',
                        timer: 8500
                    }
                )

            }
            if (error.response.status === 401) {
                Swal.fire(
                    {
                        title: 'Campo [ Cantidad ]',
                        text: error.response.data.message,
                        icon: 'warning',
                        timer: 8500
                    }
                )
            }
        }
    }
    const handleAdd = () => {
        setDetaillsPecosaBienes([...detailsspecosabienes, {
            pecosaPedidoId: "",
            inventaridoInicialId: "",
            nea_bien_id: "",
            descripcion: "",
            cantidad: "",
            medida:"",
            p_unitario: "",
            cuenta_contable: "",
            observaciones: "INVENTARIADO",
            fecha: "",

        }])
    }

    const handleRemove = (item) => {
        const list = [...detailsspecosabienes]
        list.splice(item, 1)
        setDetaillsPecosaBienes(list)
    }
    return (
        <>
            <div className='crear_pecosa_bienes'>
                <div className="top">
                    <h1>Crear Bienes de la Pecosa</h1>
                </div>

                <div className="cont_form_bienes">
                    <div className="right">

                        <form onSubmit={Pecosa_Bien}>
                            {/*  <p>EL error es: {error}</p>*/}
                            {
                                detailsspecosabienes.map((value_cont, index) => (
                                    <div key={index} className='gen_fromImput'>
                                        <div className='prin_formImput'>



                                            <div className='formInput_pecosa'>
                                                <label>Pecosa</label>
                                                <Autocomplete
                                                    className='autocomplete_1'
                                                    value={
                                                        pecosaPedidoId
                                                            ? pecosapedidos.find((option) => {
                                                                return pecosaPedidoId === option.id;
                                                            }) ?? null
                                                            : null
                                                    }

                                                    onChange={(event, newValue) => {
                                                        setPecosaPedidosId(newValue ? newValue.id : null, index)
                                                    }}
                                                    disablePortal
                                                    sx={{ width: 700 }}
                                                    disableListWrap
                                                    PopperComponent={StyledPopper}
                                                    ListboxComponent={ListboxComponent}
                                                    options={pecosapedidos}
                                                    getOptionLabel={(option) => ''+option.id + ' -- ' + option.fecha+ ' ' + option.tipo_de_sede} 
                                                    renderInput={(params) => <TextField  {...params} label="Buscar" variant="outlined" />}
                                                    renderOption={(props, option, state) => [props, state?.item ? state.id : '','PECOSA: ' + option.id + '--' + option.fecha + ' ' + option.tipo_de_sede]}
                                                    renderGroup={(params) => params}



                                                />
                                                {/*<input
                                                    type="text"
                                                    list="datap"
                                                    placeholder='FILTRAR PEDIDO DE PECOSA '
                                                    name='pecosaPedidoId'
                                                    value={pecosaPedidoId}
                                                    onChange={(e) => setPecosaPedidosId(e.target.value)}
                                                    required
                                                />
                                                <datalist className='datalistt' id="datap">
                                                    {
                                                        pecosapedidos
                                                            .map(res => {
                                                                return (
                                                                    <option className='options' key={'NEA' + res.id} placeholder='ID' value={res.id}> PECOSA {res.id} ----- {res.fecha}</option>
                                                                )
                                                            })
                                                    }
                                                </datalist>*/}
                                            </div>
                                            <div className="formInput_pecosa">
                                                <label>Fecha de Registro</label>
                                                <input
                                                    name='fecha'
                                                    value={fecha}
                                                    onChange={(e) => setFecha(e.target.value)}
                                                    type="date"
                                                    placeholder=''
                                                    required
                                                />
                                            </div>
                                            <div className='formInput_title'>
                                                <h4>Sección de Elegir Bienes de  Inventariado o de Neas (OJO SELECCIONE SOLO UNO)</h4>
                                            </div>
                                            <div className='formInput_1'>
                                                <label>Bienes de Inventariado Inicial </label>
                                                <Autocomplete
                                                    className='autocomplete_1'
                                                    value={
                                                        value_cont.inventaridoInicialId
                                                            ? bienes.find((option) => {
                                                                return value_cont.inventaridoInicialId === option.id;
                                                            }) ?? null
                                                            : null 
                                                    }

                                                    onChange={(event, newValue) => {
                                                        handleSubmit1('inventaridoInicialId', newValue ? newValue.id : null, index)
                                                    }}
                                                    disablePortal
                                                    sx={{ width: 700 }}
                                                    disableListWrap
                                                    PopperComponent={StyledPopper}
                                                    ListboxComponent={ListboxComponent}
                                                    options={bienes}
                                                    getOptionLabel={(option) => option.biene.description + ' || STOK:' + option.cantidad}
                                                    renderInput={(params) => <TextField  {...params} label="Buscar" variant="outlined" />}
                                                    renderOption={(props, option, state) => [props, state?.item ? state.id : ' ', option.id + " " + option.biene.description + ' || STOK:' + option.cantidad + '']}
                                                    renderGroup={(params) => params}



                                                />
                                                {/* <input
                                                    type="text" list="bienesp"
                                                    placeholder=''
                                                    name='inventaridoInicialId'
                                                    value={value_cont.inventaridoInicialId}
                                                    onChange={(e) => handleSubmit(e, index)}

                                                />
                                                <FilterInventariado />*/}
                                            </div>
                                            <div className="formInput_1" >
                                                <label htmlFor='residente'>Bienes de Neas</label>
                                                <Autocomplete
                                                    className='autocomplete_1'
                                                    value={
                                                        value_cont.nea_bien_id
                                                            ? neasbien.find((option) => {
                                                                return value_cont.nea_bien_id === option.id;
                                                            }) ?? null
                                                            : null
                                                    }

                                                    onChange={(event, newValue) => {
                                                        handleSubmit1('nea_bien_id', newValue ? newValue.id : null, index)
                                                    }}
                                                    disablePortal
                                                    sx={{ width: 700 }}
                                                    disableListWrap
                                                    PopperComponent={StyledPopper}
                                                    ListboxComponent={ListboxComponent}
                                                    options={neasbien}
                                                    getOptionLabel={(option) => option.biene.description + ' || STOK: ' + option.cantidad + ' || NEA: ' + option.neaEntradaId + ' || MEDIDA:  ' + option.biene.unidad_de_medida }
                                                    renderInput={(params) => <TextField  {...params} label="Buscar" variant="outlined" />}
                                                    renderOption={(props, option, state) => [props, state?.item ? state.id : ' ', option.id + " " + option.biene.description + ' || STOK:' + option.cantidad + ' || NEA: ' + option.neaEntradaId + ' || ' + option.fecha]}
                                                    renderGroup={(params) => params}

                                                />
                                             
                                            </div>

                                            <div className='formInput'>
                                                <label>AGREGAR DESCRIPCION </label>
                                                <textarea
                                                    name='descripcion'
                                                    value={value_cont.descripcion}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="textera"
                                                    placeholder=''
                                                //required
                                                />
                                            </div>

                                            {/*<div className='formInput_title'>
                                                <h4>Sección de Ingresar cantidad y observación (Si seleccion los materiales de neas, en observaciones aparecera un texto morado para ingresar el numero de NEA)</h4>
                                            </div>*/}
                                            <div className="formInput_2" >
                                                <label>Cantidad</label>
                                                <input
                                                    name='cantidad'
                                                    value={value_cont.cantidad}
                                                    onChange={(e) => handleSubmit(e, index)} type="number"
                                                    placeholder=''
                                                    //min="1"
                                                    required
                                                />
                                            </div>
                                            <div className="formInput_2" >
                                                <label>Entrada de Medida</label>
                                                <input
                                                type="text"
                                                list="data1m"
                                                name='medida'
                                                value={value_cont.medida}
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
                                            <div className="formInput_2">
                                                <label>Inventario u Nea</label>
                                                {/*<select
                                                    disabled
                                                    type="text"
                                                    placeholder='Select'
                                                    name='nea_bien_id'
                                                    value={value_cont.nea_bien_id}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                >
                                                    <option value="">INVENTARIADO</option>
                                                    <Filter_Obs_Nea />
                                                </select>*/}
                                                <input
                                                    name='observaciones'
                                                    value={value_cont.observaciones.toUpperCase()}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="text"
                                                    placeholder=''
                                                />
                                            </div>
                                        
                                         

                                            <div className="crearButtom_input_a">
                                                {detailsspecosabienes.length - 1 === index && detailsspecosabienes.length < 10 &&
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
                                            {detailsspecosabienes.length > 1 &&
                                                (

                                                    <button type='button' className="buttonR"
                                                        onClick={() => handleRemove(index)}>
                                                        <span>Eliminar</span>
                                                    </button>

                                                )
                                            }
                                        </div>
                                    </div>

                                )
                                )
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
            </div >
        </>
    );
}

export default CrearPecosaBienes_cont;   