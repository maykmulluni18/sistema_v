import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "./editarmetas.scss"
import Swal from 'sweetalert2'
import FilterResidente from '../CrearMetas/FiterResidente';
import FilterAlmacenario from '../CrearMetas/FiterAlmacenario';
import FilterAsistente from '../CrearMetas/FilterAsistente';

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



const EditarMetas_cont = () => {

    const [administrativos, setAdministrativos] = useState([])
    const getAdministrativos = async () => {
        const res = await axios.get(URI4)
        setAdministrativos(res.data)
    }


    const [meta_1, setMeta1] = useState('')
    const [meta_2, setMeta2] = useState('')
    const [obra, setObra] = useState('')
    const [id_residente, setResidente] = useState('')
    const [id_almacenario, setAlmacenario] = useState('')
    const [id_asistente_adm, setAsistenteAdm] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const updateeMetas = async (e) => {
        e.preventDefault()
        try {
            const respon = await axios.put(URI + id, {
                meta_1: meta_1 || null,
                meta_2: meta_2 || null,
                obra: obra,
                id_residente: id_residente || null,
                id_almacenario: id_almacenario || null,
                id_asistente_adm: id_asistente_adm || null
            })
            if (respon.status === 200) {
                Swal.fire(
                    {
                        title: 'Editado con Exito..',
                        icon: 'success',
                        timer: 5500
                    }
                )
                navigate('/metas')

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


    const getSedesId = async () => {
        const resb = await axios.get(URI + id,)
        setMeta1(resb.data.meta_1)
        setMeta2(resb.data.meta_2)
        setObra(resb.data.obra)
        setResidente(resb.data.id_residente)
        setAlmacenario(resb.data.id_almacenario)
        setAsistenteAdm(resb.data.id_asistente_adm)
    }
    useEffect(() => {
        getAdministrativos()
        getSedesId()
    }, [])

    return (
        <>
            <div className='cont_edit_metas'>
                <div className="top">
                    <h1>Editar un Metas : {id}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={updateeMetas}>
                            <div className="formInput" >
                                <label>META 1</label>
                                <input
                                    value={meta_1}
                                    onChange={(e) => setMeta1(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder=""
                                    required
                                />
                            </div>
                            <div className="formInput" >
                                <label>META 2</label>
                                <input
                                    value={meta_2}
                                    onChange={(e) => setMeta2(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder=""
                                //required
                                />
                            </div>
                            <div className="formInput" >
                                <label>Obra</label>
                                <input
                                    value={obra}
                                    onChange={(e) => setObra(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder=""
                                    required
                                />
                            </div>

                            <div className='formInput_1'>
                                <label htmlFor='residente'>RESIDENTE</label>

                                <Autocomplete
                                    className='autocomplete_1'
                                    value={
                                        id_residente
                                            ? administrativos.find((option) => {
                                                return id_residente === option.id;
                                            }) ?? null
                                            : null
                                    }

                                    onChange={(event, newValue) => {
                                        setResidente(newValue ? newValue.id : null)
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
                                        id_almacenario
                                            ? administrativos.find((option) => {
                                                return id_almacenario === option.id;
                                            }) ?? null
                                            : null
                                    }

                                    onChange={(event, newValue) => {
                                        setAlmacenario(newValue ? newValue.id : null)
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
                                        id_asistente_adm
                                            ? administrativos.find((option) => {
                                                return id_asistente_adm === option.id;
                                            }) ?? null
                                            : null
                                    }

                                    onChange={(event, newValue) => {
                                        setAsistenteAdm(newValue ? newValue.id : null)
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
export default EditarMetas_cont;