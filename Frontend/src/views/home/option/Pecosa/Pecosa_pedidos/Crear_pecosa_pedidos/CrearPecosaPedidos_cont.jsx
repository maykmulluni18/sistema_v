import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import FilterData from './FilterData';
import "./crearpecosapedidos.scss"
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import Typography from '@mui/material/Typography';
import FilterData2 from './FilterData2';
import { DB_URL } from '../../../../../../config/config';



const URI = DB_URL + 'pecosapedidos/'

const URI1 = DB_URL + 'metas/'

//const URI2 = DB_URL + 'bienes/'

//const URI3 = DB_URL + 'sedes/'

const URI4 = DB_URL + 'user/'


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




const CrearPecosaPedidos_cont = () => {
    //const [bienes, setBienes] = useState([])
    //const [sedes, setSedes] = useState([])
    const [metas, setMetas] = useState([])

    /*const getBienes = async () => {
        const res = await axios.get(URI2)
        setBienes(res.data)
    }
    const getSedes = async () => {
        const res = await axios.get(URI3)
        setSedes(res.data)
    }*/
    const [administrativos, setAdministrativos] = useState([])
    const getAdministrativos = async () => {
        const res = await axios.get(URI4)
        setAdministrativos(res.data)
    }
    /* const rr=useCallback(()=>{
         getAdministrativos(administrativos)
     },[administrativos])*/

    const getMetas = async () => {
        const res = await axios.get(URI1)
        setMetas(res.data)
    }

    useEffect(() => {
        //getSedes()
        getMetas()
        getAdministrativos()

    }, [])
    const [inputValue, setInputValue] = React.useState('');


    const [dependencias, setDependencias] = useState('')
    const [id_administrativos, setIdAdministrativos] = useState('')
    const [id_administrativo2, setIdAdministrativo2] = useState('')
    const [tipo_de_sede, setTipoDeSede] = useState('ALMACEN CENTRAL DE OBRAS')
    const [fecha, setFecha] = useState('')
    const [almacen, setAlmacen] = useState('ALMACEN CENTRAL DE OBRAS')
    const [id_metas, setIdMetas] = useState('')
    const [oficio, setOficio] = useState('')

    const navigate = useNavigate()
    const Pecosa_Pedidos = async (e) => {
        e.preventDefault();
        try {
            const respon = await axios.post(URI, {
                dependencias: dependencias,
                id_administrativos: id_administrativos,
                id_administrativo2: id_administrativo2,
                tipo_de_sede: tipo_de_sede,
                id_metas: id_metas,
                oficio: oficio,
                fecha: fecha,
                almacen: almacen
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
                navigate('/pecosa-pedidos')

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

    return (
        <>
            <div className='crear_pecosa_pedidos'>
                <div className="top">
                    <h1>Crear Pedidos de la Pecosa</h1>
                </div>
                <div className="cont_form_bienes">
                    <div className="right">
                        <form onSubmit={Pecosa_Pedidos}>
                            <div className='formInput'>
                                <label>Solicitante</label>
                                {/*  <div>{`value: ${id_administrativos !== null ? `'${id_administrativos}'` : 'null'}`}</div>
                                <div>{`inputValue: '${inputValue}'`}</div>*/}
                                <Autocomplete
                                    className='autocomplete'
                                    value={
                                        id_administrativos
                                            ? administrativos.find((option) => {
                                                return id_administrativos === option.id;
                                            }) ?? null
                                            : null
                                    }

                                    onChange={(event, newValue) => {
                                        setIdAdministrativos(newValue ? newValue.id : null)
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
                            </div>
                            <div className='formInput'>
                                <label>Entregar A</label>
                                {/*  <div>{`value: ${id_administrativo2 !== null ? `'${id_administrativo2}'` : 'null'}`}</div>
                                <div>{`inputValue: '${inputValue}'`}</div>*/}
                                <Autocomplete
                                    className='autocomplete'
                                    value={
                                        id_administrativo2
                                            ? administrativos.find((option) => {
                                                return id_administrativo2 === option.nombres + ' ' + option.apellido_paterno + ' ' + option.apellido_materno;
                                            }) ?? null
                                            : null
                                    }

                                    onChange={(event, newValue) => {
                                        setIdAdministrativo2(newValue ? newValue.nombres + ' ' + newValue.apellido_paterno + ' ' + newValue.apellido_materno : null)
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
                                {/* <input
                                    type="text"
                                    list="datap2"
                                    placeholder=''
                                    value={id_administrativo2}
                                    onChange={(e) => setIdAdministrativo2(e.target.value)}
                                    required
                                />
                                <FilterData2 /> */}
                            </div>
                            <div className="formInput_1">
                                <label>Destino</label>
                                <Autocomplete
                                    className='autocomplete_1'
                                    value={
                                        dependencias
                                            ? metas.find((option) => {
                                                return dependencias === option.obra;
                                            }) ?? null
                                            : null
                                    }

                                    onChange={(event, newValue) => {
                                        setDependencias(newValue ? newValue.obra : null)
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
                                    options={metas}
                                    //title={(option) => " " + option.obra + " -- META 1: -- " + option.meta_1 + " -- META 2: -- " + option.meta_2 }
                                    //groupBy={(option) => option.nombres}
                                    getOptionLabel={(option) => option.obra}
                                    renderInput={(params) => <TextField {...params} label="Buscar" />}
                                    renderOption={(props, option, state) => [props, state?.item ? state.item : ' ', option.id + " " + option.obra ]}
                                    // TODO: Post React 18 update - validate this conversion, look like a hidden bug
                                    renderGroup={(params) => params}
                                />
                          
                            </div>
                           
                            <div className='formInput_1'>
                                <label>Metas Obras </label>

                                <Autocomplete
                                    className='autocomplete_1'
                                    value={
                                        id_metas
                                            ? metas.find((option) => {
                                                return id_metas === option.id;
                                            }) ?? null
                                            : null
                                    }

                                    onChange={(event, newValue) => {
                                        setIdMetas(newValue ? newValue.id : null)
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
                                    options={metas}
                                    //title={(option) => " " + option.obra + " -- META 1: -- " + option.meta_1 + " -- META 2: -- " + option.meta_2 }
                                    //groupBy={(option) => option.nombres}
                                    getOptionLabel={(option) => " " + option.obra + " -- META 1: -- " + option.meta_1 + " -- META 2: -- " + option.meta_2 }
                                    renderInput={(params) => <TextField {...params} label="Buscar" />}
                                    renderOption={(props, option, state) => [props, state?.item ? state.item : ' ', option.id + " " + option.obra + " -- META 1: -- " + option.meta_1 + " -- META 2: -- " + ( option.meta_2 ) ?? null]}
                                    // TODO: Post React 18 update - validate this conversion, look like a hidden bug
                                    renderGroup={(params) => params}
                                />
                            {/*  <input
                                    type="text" list="metas_d"
                                    placeholder=''
                                    value={id_metas}
                                    onChange={(e) => setIdMetas(e.target.value)}
                                    required
                                />
                                <datalist id="metas_d">
                                    {
                                        metas
                                            .map(res => {
                                                return (
                                                    <option key={res.id} value={res.id}>[Meta 1: {res.meta_1}] -- [Meta 2 :{res.meta_2}] -- [{res.obra}] </option>
                                                )
                                            })
                                    }

                                </datalist>
                                */}
                            </div>
                            <div className="formInput" >
                                <label>Almacen</label>
                                <input
                                    value={almacen}
                                    onChange={(e) => setAlmacen(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder=''
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
                            <div className='formInput'>
                                <label>Tipo de Sedes</label>

                                <input
                                    type="text" list="bienesp"
                                    placeholder=''
                                    value={tipo_de_sede}
                                    onChange={(e) => setTipoDeSede(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="formInput">
                                <label>Fecha de Registro</label>
                                <input
                                    value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                    type="date"
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

export default CrearPecosaPedidos_cont;   