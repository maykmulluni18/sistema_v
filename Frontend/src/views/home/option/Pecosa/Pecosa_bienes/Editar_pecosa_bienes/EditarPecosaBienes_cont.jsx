import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from "../../../../Layout";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import "./editarpecosabienes.scss"
import { DB_URL } from '../../../../../../config/config';
import EditFilterInventariado from './EditFilterInventariado';
import EditFilterNeasBien from './EditFilterNeasBien';

import TextField from '@mui/material/TextField';

import PropTypes from 'prop-types';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";

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



const EditarPecosaBienes_cont = () => {
    const { user } = useSelector((state) => state.auth)
    const [pecosapedidos, setPecosaPedidos] = useState([])
    const [bienes, setBienes] = useState([])
    const [neasbien, setNeasdBieneIdd] = useState([])

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
        setNeasdBieneIdd(res.data.reverse())
    }

    useEffect(() => {
        getPecosaPedidos()
        getNeasBien()
        getBienes()
        getPecosaBienes()
        //updatePecosaBienes()

    }, [])

    const [pecosaPedidoId, setPecosaPedidoId] = useState('')
    const [inventaridoInicialId, setInventariadoInicialId] = useState('')
    const [nea_bien_id, setNeasdBieneId] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [medida, setMedida] = useState('')
    const [observaciones, set_Observaciones] = useState('')
    const [fecha, setFecha] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const updatePecosaBienes = async (e) => {
        e.preventDefault();
        const respon = await axios.put(URI + id, {
            pecosaPedidoId: pecosaPedidoId,
            inventaridoInicialId: inventaridoInicialId || null,
            nea_bien_id: nea_bien_id || null,
            descripcion: descripcion || null,
            cantidad: cantidad,
            medida: medida,
            observaciones: observaciones,
            fecha: fecha
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

    const getPecosaBienes = async () => {
        const res = await axios.get(URI + id,)
        setPecosaPedidoId(res.data.pecosaPedidoId)
        setInventariadoInicialId(res.data.inventaridoInicialId)
        setNeasdBieneId(res.data.nea_bien_id)
        setDescripcion(res.data.descripcion)
        setCantidad(res.data.cantidad)
        setMedida(res.data.medida)
        set_Observaciones(res.data.observaciones)
        setFecha(res.data.fecha)
    }

    return (
        <>
            <div className='editarpecosabienes'>
                <div className="top">
                    <h1>Editar Bienes de la Pecosa: {id}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={updatePecosaBienes}>
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
                                        pecosaPedidoId(newValue ? newValue.id : null)
                                    }}
                                    disablePortal
                                    sx={{ width: 700 }}
                                    disableListWrap
                                    PopperComponent={StyledPopper}
                                    ListboxComponent={ListboxComponent}
                                    options={pecosapedidos}
                                    getOptionLabel={(option) => '' + option.id + ' -- ' + option.fecha + ' ' + option.tipo_de_sede}
                                    renderInput={(params) => <TextField  {...params} label="Buscar" variant="outlined" />}
                                    renderOption={(props, option, state) => [props, state?.item ? state.id : '', 'PECOSA: ' + option.id + '--' + option.fecha + ' ' + option.tipo_de_sede]}
                                    renderGroup={(params) => params}



                                />

                            </div>
                            <div className="formInput_pecosa">
                                <label>Fecha de Registro</label>
                                <input
                                    value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                    type="date"
                                    required
                                />
                            </div>
                            <div className='formInput_title'>
                                <h4>Sección de Elegir Bienes de  Inventariado o de Neas (OJO SELECCIONE SOLO UNO)</h4>
                            </div>
                            <div className='formInput_1'>
                                <label>Bienes Inventariado </label>
                                <Autocomplete
                                    className='autocomplete_1'
                                    value={
                                        inventaridoInicialId
                                            ? bienes.find((option) => {
                                                return inventaridoInicialId === option.id;
                                            }) ?? null
                                            : null
                                    }

                                    onChange={(event, newValue) => {
                                        setInventariadoInicialId(newValue ? newValue.id : null)
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

                            </div>
                            <div className='formInput_1'>
                                <label>Bienes Neas </label>
                                <Autocomplete
                                    className='autocomplete_1'
                                    value={
                                        nea_bien_id
                                            ? neasbien.find((option) => {
                                                return nea_bien_id === option.id;
                                            }) ?? null
                                            : null
                                    }

                                    onChange={(event, newValue) => {
                                        setNeasdBieneId(newValue ? newValue.id : null)
                                    }}
                                    disablePortal
                                    sx={{ width: 700 }}
                                    disableListWrap
                                    PopperComponent={StyledPopper}
                                    ListboxComponent={ListboxComponent}
                                    options={neasbien}
                                    getOptionLabel={(option) => option.biene.description + ' || STOK: ' + option.cantidad + ' || NEA: ' + option.neaEntradaId + ' || MEDIDA:  ' + option.biene.unidad_de_medida}
                                    renderInput={(params) => <TextField  {...params} label="Buscar" variant="outlined" />}
                                    renderOption={(props, option, state) => [props, state?.item ? state.id : ' ', option.id + " " + option.biene.description + ' || STOK:' + option.cantidad + ' || NEA: ' + option.neaEntradaId + ' || ' + option.fecha]}
                                    renderGroup={(params) => params}

                                />

                            </div>
                            <div className='formInput'>
                                <label>Descripcion</label>
                                <textarea
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    type="textera"
                                //required
                                />
                            </div>
                            {/*<div className='formInput_title'>
                                <h4>Sección de Ingresar cantidad y observación</h4>
                            </div>*/}
                            <div className="formInput_2">
                                <label>Cantidad</label>
                                <input
                                    value={cantidad}
                                    onChange={(e) => setCantidad(e.target.value)}
                                    type="number"
                                    required
                                    disabled

                                />
                            </div>
                            <div className="formInput_2" >
                                <label>Entrada de Medida</label>
                                <input
                                    type="text"
                                    list="data1m"
                                    name='medida'
                                    value={medida}
                                    label="Medida"
                                    onChange={(e) => setMedida(e.target.value)}
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
                                <input
                                    value={observaciones}
                                    onChange={(e) => set_Observaciones(e.target.value.toUpperCase())}
                                    type="text"
                                    required
                                />
                            </div>


                            <div className='crearButtom_B'>
                                {user && user.role === "admin" && (
                                    <button className='button1' type='submit'>Guardar</button>
                                )}
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

export default EditarPecosaBienes_cont;   