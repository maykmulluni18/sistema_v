import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
//import UNAP from "../UNAP.png";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import "./editarneasentradas.scss"
import FilterAdministrativos from './FilterAdministrativos';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import Typography from '@mui/material/Typography';
import { DB_URL } from '../../../../../../config/config';
import { LogOut, reset } from "../../../../auth/Authen";
import { useDispatch, useSelector } from "react-redux";

const URI = DB_URL + 'neasentradas/'

const URI1 = DB_URL + 'user/'

const URI3 = DB_URL + 'sedes/'


const URI4 = DB_URL + 'metas/'

const URI5 = DB_URL + 'almacen/'

const URI6 = DB_URL + 'user/'


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

const EditarNeasEntradas_cont = () => {

    const { user } = useSelector((state) => state.auth)


    const [sedes, setSedes] = useState([])
    const [almacen, setAlmacen] = useState([])
    const [obra, setObras] = useState([])

    const getSedes = async () => {
        const res = await axios.get(URI3)
        setSedes(res.data)
    }
    const getAlmacens = async () => {
        const res = await axios.get(URI5)
        setAlmacen(res.data)
    }
    const getObrass = async () => {
        const res = await axios.get(URI4)
        setObras(res.data)
    }

    const [administrativos, setAdministrativos] = useState([])
    const getAdministrativos = async () => {
        const res = await axios.get(URI6)
        setAdministrativos(res.data)
    }


    useEffect(() => {
        //getSedes()
        getAdministrativos()
        getObrass()
        getNeasEntradas()
        Neas_Entradas()
    }, [])


    const [id_administradores, setIdAdministradores] = useState('')
    const [tipo_de_sede, setTipoDeSede] = useState('')
    const [tipo_de_ingreso, setTipoDeIngreso] = useState('')
    const [recibido_por, setRecibidoPor] = useState('')
    const [id_obras, setIdObras] = useState('')
    const [tipo_de_moneda, setTipoDeMoneda] = useState('')
    const [tipo_de_almacen, setTipoDeAlmacen] = useState('')
    const [documento, setDocumento] = useState('')
    const [tipo_de_cambio, setTipoDeCambio] = useState('')
    const [tipo_de_uso, setTipoDeUso] = useState('')
    const [fecha_de_nea, setFechaDeNea] = useState('')
    const [fecha_de_registro, setFechaDeRegristro] = useState('')
    const [oficio, setOficio] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    const Neas_Entradas = async (e) => {
        e.preventDefault();
        try {
            const respon = await axios.put(URI + id, {
                id_administradores: id_administradores,
                tipo_de_sede: tipo_de_sede,
                tipo_de_ingreso: tipo_de_ingreso,
                recibido_por: recibido_por,
                id_obras: id_obras,
                tipo_de_moneda: tipo_de_moneda,
                tipo_de_almacen: tipo_de_almacen,
                documento: documento,
                tipo_de_cambio: tipo_de_cambio,
                tipo_de_uso: tipo_de_uso,
                fecha_de_nea: fecha_de_nea,
                fecha_de_registro: fecha_de_registro,
                oficio: oficio
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
            }
            navigate('/neas-entradas')
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

    const getNeasEntradas = async () => {
        const res = await axios.get(URI + id,)
        setIdAdministradores(res.data.id_administradores)
        setTipoDeSede(res.data.tipo_de_sede)
        setTipoDeIngreso(res.data.tipo_de_ingreso)
        setRecibidoPor(res.data.recibido_por)
        setIdObras(res.data.id_obras)
        setTipoDeMoneda(res.data.tipo_de_moneda)
        setTipoDeAlmacen(res.data.tipo_de_almacen)
        setDocumento(res.data.documento)
        setTipoDeCambio(res.data.tipo_de_cambio)
        setTipoDeUso(res.data.tipo_de_uso)
        setFechaDeNea(res.data.fecha_de_nea)
        setFechaDeRegristro(res.data.fecha_de_registro)
        setOficio(res.data.oficio)

    }
    const selectAdministrativo = (e) => {
        setIdAdministradores(e.target.value)
    }
    {/*
    const selectSedes = (e) => {
        setIdSedes(e.target.value)
    }
    */}

    return (
        <>
            <div className='cont_editar_neas_entradas'>
                <div className="top">
                    <h1>Editar Entrada de las Neas</h1>
                </div>
                <div className="cont_form_bienes">
                    <div className="right">
                        <form onSubmit={Neas_Entradas}>
                            <div className='formInput'>
                                <label>Solicitante Id:{id_administradores.nombres}</label>
                                <Autocomplete
                                    className='autocomplete_1'
                                    value={
                                        id_administradores
                                            ? administrativos.find((option) => {
                                                return id_administradores === option.id;
                                            }) ?? null
                                            : null
                                    }

                                    onChange={(event, newValue) => {
                                        setIdAdministradores(newValue ? newValue.id : null)
                                    }}
                                    //inputValue={inputValue}
                                    /*onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}*/
                                    disablePortal
                                    id="virtualize-demo"
                                    sx={{ width: 700 }}
                                    disableListWrap
                                    PopperComponent={StyledPopper}
                                    ListboxComponent={ListboxComponent}
                                    options={administrativos}
                                    //groupBy={(option) => option.nombres}
                                    getOptionLabel={(option) => option.nombres + " " + option.apellido_paterno + " " + option.apellido_materno}
                                    renderInput={(params) => <TextField {...params} label="Buscar" />}
                                    renderOption={(props, option, state) => [props, state?.item ? state.id : ' ', option.id + " " + option.nombres + " " + option.apellido_paterno + " " + option.apellido_materno]}
                                    // TODO: Post React 18 update - validate this conversion, look like a hidden bug
                                    renderGroup={(params) => params}
                                />
                                {/*<input
                                    type="text"
                                    list="data1"
                                    placeholder='filtrar'
                                    value={id_administradores}
                                    onChange={selectAdministrativo}
                                    required
                                />
                                <FilterAdministrativos />*/}
                            </div>
                            <div className='formInput'>
                                <label>Sedes Id</label>

                                <input
                                    type="text" list="bienes"
                                    placeholder='filtrar'
                                    value={tipo_de_sede}
                                    onChange={(e) => setTipoDeSede(e.target.value.toUpperCase())}
                                    required
                                />

                            </div>

                            <div className="formInput" >
                                <label>Tipo de Ingreso</label>
                                <input
                                    value={tipo_de_ingreso}
                                    onChange={(e) => setTipoDeIngreso(e.target.value.toUpperCase())}
                                    type="text"
                                    required

                                />
                            </div>
                            <div className="formInput" >
                                <label>Recibido Por</label>
                                <input
                                    value={recibido_por}
                                    onChange={(e) => setRecibidoPor(e.target.value.toUpperCase())}
                                    type="text"
                                    required
                                />
                            </div>

                            <div className="formInput_1">
                                <label>Tipo de Obra</label>
                                <Autocomplete
                                    className='autocomplete_1'
                                    value={
                                        id_obras
                                            ? obra.find((option) => {
                                                return id_obras === option.id;
                                            }) ?? null
                                            : null
                                    }

                                    onChange={(event, newValue) => {
                                        setIdObras(newValue ? newValue.id : null)
                                    }}
                                    //inputValue={inputValue}
                                    /*onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}*/
                                    disablePortal
                                    id="virtualize-demo"
                                    sx={{ width: 700 }}
                                    disableListWrap
                                    PopperComponent={StyledPopper}
                                    ListboxComponent={ListboxComponent}
                                    options={obra}
                                    //title={(option) => " " + option.obra + " -- META 1: -- " + option.meta_1 + " -- META 2: -- " + option.meta_2 }
                                    //groupBy={(option) => option.nombres}
                                    getOptionLabel={(option) => " " + option.obra + " -- META 1: -- " + option.meta_1 + " -- META 2: -- " + option.meta_2}
                                    renderInput={(params) => <TextField {...params} label="Buscar" />}
                                    renderOption={(props, option, state) => [props, state?.item ? state.item : ' ', option.id + " " + option.obra + " -- META 1: -- " + option.meta_1 + " -- META 2: -- " + (option.meta_2) ?? null]}
                                    // TODO: Post React 18 update - validate this conversion, look like a hidden bug
                                    renderGroup={(params) => params}
                                />
                                {/*<input
                                    type="text" list="obrass"
                                    placeholder='filtrar'
                                    value={tipo_de_obra}
                                    onChange={(e) => setTipoDeObra(e.target.value.toUpperCase())}
                                    required
                                />
                                <datalist id="obrass">
                                    {
                                        obra

                                            .map(res => {
                                                return (
                                                    <option key={res.id} value={res.id}> {res.obras} </option>
                                                )
                                            })
                                    }

                                </datalist>*/}
                            </div>
                            <div className="formInput_2">
                                <label>Tipo de Moneda</label>
                                <input
                                    value={tipo_de_moneda}
                                    onChange={(e) => setTipoDeMoneda(e.target.value.toUpperCase())}
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="formInput_2">
                                <label>Tipo de Cambio</label>
                                <input
                                    value={tipo_de_cambio}
                                    onChange={(e) => setTipoDeCambio(e.target.value.toUpperCase())}
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="formInput_2">
                                <label>Tipo de Uso</label>
                                <input
                                    value={tipo_de_uso}
                                    onChange={(e) => setTipoDeUso(e.target.value.toUpperCase())}
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="formInput">
                                <label>Tipo de Almacen</label>
                                <input
                                    value={tipo_de_almacen}
                                    onChange={(e) => setTipoDeAlmacen(e.target.value.toUpperCase())}
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="formInput">
                                <label>Tipo de Documento</label>
                                <input
                                    value={documento}
                                    onChange={(e) => setDocumento(e.target.value.toUpperCase())}
                                    type="text"
                                    required
                                />
                            </div>

                            <div className="formInput">
                                <label>Oficio</label>
                                <input
                                    value={oficio}
                                    onChange={(e) => setOficio(e.target.value)}
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="formInput">
                                <label>Fecha de Nea</label>
                                <input
                                    value={fecha_de_nea}
                                    onChange={(e) => setFechaDeNea(e.target.value)}
                                    type="date"
                                    required
                                />
                            </div>
                            <div className="formInput">
                                <label>Fecha de Registro</label>
                                <input
                                    value={fecha_de_registro}
                                    onChange={(e) => setFechaDeRegristro(e.target.value)}
                                    type="date"
                                    required
                                />
                            </div>
                            <div className='crearButtom_B'>
                                {user && user.role === "admin" && (
                                    <button className='button1' type='submit'>Guardar</button>
                                )}
                                <Link to={'../../neas-entradas'} className='butoon_2' >
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
export default EditarNeasEntradas_cont;