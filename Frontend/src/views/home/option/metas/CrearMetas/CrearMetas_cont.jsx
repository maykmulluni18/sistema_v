import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./crearmetas.scss"
import Swal from 'sweetalert2'
import FiterResidente from './FiterResidente';
import FilterAlmacenario from './FiterAlmacenario';
import FilterAsistente from './FilterAsistente';

import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import Typography from '@mui/material/Typography';


import { DB_URL } from '../../../../../config/config';

const URI = DB_URL + 'metas/'
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



const CrearMetas_cont = () => {
    const [administrativos, setAdministrativos] = useState([])
    const getAdministrativos = async () => {
        const res = await axios.get(URI4)
        setAdministrativos(res.data)
    }


    const navigate = useNavigate()
    const [detailss, setDetaills] = useState([{
        meta_1: "",
        meta_2: "",
        obra: "",
        id_residente: '',
        id_almacenario: "",
        id_asistente_adm: "",
    },
    ])


    const Metas = async (event) => {
        event.preventDefault();
        try {
            for (let i = 0; i < detailss.length; i++) {
                const respon = await axios.post(URI,
                    {
                        meta_1: detailss[i].meta_1 || null,
                        meta_2: detailss[i].meta_2 || null,
                        obra: detailss[i].obra.toUpperCase(),
                        id_residente: detailss[i].id_residente,
                        id_almacenario: detailss[i].id_almacenario || null,
                        id_asistente_adm: detailss[i].id_asistente_adm || null,
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
                    navigate('/metas')
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
            meta_1: "",
            meta_2: "",
            obra: "",
            id_residente: '',
            id_almacenario: "",
            id_asistente_adm: "",
        }])
    }

    const handleRemove = (item) => {
        const list = [...detailss]
        list.splice(item, 1)
        setDetaills(list)
    }

    const handleSubmit = (event, index) => {
        const { name, value } = event.target
        const list = [...detailss]
        list[index][name] = value
        setDetaills(list)
    }
    const handleSubmit1 = (name, value, index) => {
        const list = [...detailss]
        list[index][name] = value
        setDetaills(list)
    }
    useEffect(() => {
        getAdministrativos()
    }, [])
    const [inputValue, setInputValue] = React.useState('');

    return (
        <>
            <div className='cont_crear_bien'>
                <div className="top">
                    <h1>Crear un Meta </h1>
                </div>
                <div className="cont_form_bienes">
                    <div className="right">
                        <form onSubmit={Metas}>
                            {
                                detailss.map((valu_cont, index) => (
                                    <div key={index} className="gen_fromImput">
                                        <div className="prin_formImput">
                                            <p>La insercion multiple solo esta permitido 10 de : {index + 1}</p>

                                            <div className="formInput_2" >

                                                <label htmlFor='meta_1'>META 1</label>
                                                <input
                                                    id='meta_1'
                                                    value={valu_cont.meta_1}
                                                    name='meta_1'
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="text"
                                                    placeholder=""
                                                    required


                                                />
                                            </div>
                                            <div className="formInput_2" >
                                                <label htmlFor='meta_2'>META 2</label>
                                                <input
                                                    id='meta_2'
                                                    value={valu_cont.meta_2}
                                                    name='meta_2'
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="text"
                                                    placeholder=''
                                                //required
                                                //pattern="[A-Z-0-9]+"
                                                />

                                            </div>
                                            <div className="formInput" >
                                                <label htmlFor='meta_2'>OBRA</label>
                                                <input
                                                    id='obra'
                                                    value={valu_cont.obra}
                                                    name='obra'
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="text"
                                                    placeholder=''
                                                    required
                                                //pattern="[A-Z-0-9]+"
                                                />

                                            </div>

                                            <div className='formInput_1'>
                                                <label htmlFor='residente'>RESIDENTE</label>
                                                
                                                <Autocomplete
                                                    className='autocomplete_1'
                                                    value={
                                                        valu_cont.id_residente
                                                            ? administrativos.find((option) => {
                                                                return valu_cont.id_residente === option.id;
                                                            }) ?? null
                                                            : null
                                                    }

                                                    onChange={(event, newValue) => {
                                                        handleSubmit1('id_residente', newValue ? newValue.id : null, index)
                                                    }}
                                                    disablePortal
                                                    sx={{ width: 700 }}
                                                    disableListWrap
                                                    PopperComponent={StyledPopper}
                                                    ListboxComponent={ListboxComponent}
                                                    options={administrativos}
                                                    getOptionLabel={(option) => option.nombres + " " + option.apellido_paterno + " " + option.apellido_materno}
                                                    renderInput={(params) => <TextField  {...params} label="Buscar" variant="outlined" />}
                                                    renderOption={(props, option, state) => [props, state?.item ? state.id : ' ', option.id + " " + option.nombres + " " + option.apellido_paterno + " " + option.apellido_materno]}
                                                    renderGroup={(params) => params}

                                                    name='id_residente'


                                                />



                                            </div>

                                            <div className='formInput_1'>
                                                <label htmlFor='almacenario'>ALMACENARIO</label>

                                                <Autocomplete
                                                    className='autocomplete_1'
                                                    value={
                                                        valu_cont.id_almacenario
                                                            ? administrativos.find((option) => {
                                                                return valu_cont.id_almacenario === option.id;
                                                            }) ?? null
                                                            : null
                                                    }

                                                    onChange={(event, newValue) => {
                                                        handleSubmit1('id_almacenario', newValue ? newValue.id : null, index)
                                                    }}
                                                    disablePortal
                                                    sx={{ width: 700 }}
                                                    disableListWrap
                                                    PopperComponent={StyledPopper}
                                                    ListboxComponent={ListboxComponent}
                                                    options={administrativos}
                                                    getOptionLabel={(option) => option.nombres + " " + option.apellido_paterno + " " + option.apellido_materno}
                                                    renderInput={(params) => <TextField  {...params} label="Buscar" variant="outlined" />}
                                                    renderOption={(props, option, state) => [props, state?.item ? state.id : ' ', option.id + " " + option.nombres + " " + option.apellido_paterno + " " + option.apellido_materno]}
                                                    renderGroup={(params) => params}

                                                    name='id_almacenario'


                                                />


                                                {/*<input
                                                    id='almacenario'
                                                    type="text"
                                                    list="dataA"
                                                    placeholder=''
                                                    value={valu_cont.id_almacenario}
                                                    name='id_almacenario'
                                                    onChange={(e) => handleSubmit(e, index)}
                                                //required
                                                />*/}
                                            </div>
                                            <div className='formInput_1'>
                                                <label htmlFor='asistente_adm'>ASISTENTE_ADMINISTATIVO</label>
                                                <Autocomplete
                                                    className='autocomplete_1'
                                                    value={
                                                        valu_cont.id_asistente_adm
                                                            ? administrativos.find((option) => {
                                                                return valu_cont.id_asistente_adm === option.id;
                                                            }) ?? null
                                                            : null
                                                    }

                                                    onChange={(event, newValue) => {
                                                        handleSubmit1('id_asistente_adm', newValue ? newValue.id : null, index)
                                                    }}
                                                    disablePortal
                                                    sx={{ width: 700 }}
                                                    disableListWrap
                                                    PopperComponent={StyledPopper}
                                                    ListboxComponent={ListboxComponent}
                                                    options={administrativos}
                                                    getOptionLabel={(option) => option.nombres + " " + option.apellido_paterno + " " + option.apellido_materno}
                                                    renderInput={(params) => <TextField  {...params} label="Buscar" variant="outlined" />}
                                                    renderOption={(props, option, state) => [props, state?.item ? state.id : ' ', option.id + " " + option.nombres + " " + option.apellido_paterno + " " + option.apellido_materno]}
                                                    renderGroup={(params) => params}
                                                    name='asistente_adm'


                                                />
                                                {/* <input
                                                    id='asistente_adm'
                                                    type="text"
                                                    list="dataAA"
                                                    placeholder=''
                                                    value={valu_cont.id_asistente_adm}
                                                    name='id_asistente_adm'
                                                    onChange={(e) => handleSubmit(e, index)}
                                                //required
                                            />*/}
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
        </>
    );
}

export default CrearMetas_cont;          