import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./crearinventariado.scss"
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2'
import { DB_URL } from '../../../../../config/config';
import Bienes_cont from './Bienes_cont';
import FilterDescBien from './FilterDescBien';

import TextField from '@mui/material/TextField';

import PropTypes from 'prop-types';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import Typography from '@mui/material/Typography';

const URI = DB_URL + 'invetinicial/'
const URI1 = DB_URL + 'bienes/'



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




const CrearIneventariado_cont = () => {
    {/**  const loadOptions = async (inputValue) => {
        try {
          const response = await axios.get(URI1);
          return response.data.map((item) => ({ value: item.id, label: item.description }));
        } catch (error) {
          console.error(error);
          return [];
        }
      };*/}

    const [bienes, setBienes] = useState([])

    const getBienes = async () => {
        const res = await axios.get(URI1)
        setBienes(res.data.reverse())
    }
    useEffect(() => {
        getBienes()
    }, [])

    const navigate = useNavigate()

    const [fecha_registro, setFechaRegistro] = useState('')

    const [detailss, setDetaills] = useState([{
        idBienes: "",
        descripcion: "",
        cuenta: "1501070203",
        cantidad_inicial: "",
        cantidad: "",
        precio: "",
        fecha_registro: "",
    },
    ])

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
    const Inventario = async (event) => {
        event.preventDefault();
        try {
            for (let i = 0; i < detailss?.length; i++) {
                const respon = await axios.post(URI,
                    {
                        idBienes: detailss[i].idBienes,
                        descripcion: detailss[i].descripcion,
                        cuenta: detailss[i].cuenta,
                        cantidad_inicial: detailss[i].cantidad_inicial,
                        cantidad: detailss[i].cantidad,
                        precio: detailss[i].precio,
                        fecha_registro: fecha_registro,

                    },

                )
                console.log(respon)
                if (respon.status === 200) {
                    Swal.fire(
                        {
                            title: 'Creado con Exito..',
                            // text: 'Presione Clik para cerrar!',
                            icon: 'success',
                            timer: 5500
                        }
                    )
                    navigate('/inventariado-inicial')
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
            idBienes: "",
            descripcion: "",
            cuenta: "",
            cantidad_inicial: "",
            cantidad: "",
            precio: "",
            fecha_registro: "",
        }])
    }

    const handleRemove = (item) => {
        const list = [...detailss]
        list.splice(item, 1)
        setDetaills(list)
    }
    return (
        <div className='cont_crear_inventariado'>
            <div className="top">
                <h1>Crear un Inventariado Inicial</h1>
            </div>
            <div className="cont_form_bienes">
                <div className="right">
                    <form onSubmit={Inventario}>
                        {
                            detailss.map((valu_cont, index) => (
                                <div key={index} className="gen_fromImput">
                                    <div className="prin_formImput">
                                        <div className='formInput_i'>
                                            <label htmlFor='residente'>BIENES</label>
                                            <Autocomplete
                                                className='autocomplete_1'
                                                value={
                                                    valu_cont.idBienes
                                                        ? bienes.find((option) => {
                                                            return valu_cont.idBienes === option.id;
                                                        }) ?? null
                                                        : null
                                                }

                                                onChange={(event, newValue) => {
                                                    handleSubmit1('idBienes', newValue ? newValue.id : null, index)
                                                }}
                                                disablePortal
                                                sx={{ width: 700 }}
                                                disableListWrap
                                                PopperComponent={StyledPopper}
                                                ListboxComponent={ListboxComponent}
                                                options={bienes}
                                                getOptionLabel={(option) => option.description + " || Medida: " + option.unidad_de_medida}
                                                renderInput={(params) => <TextField  {...params} label="Buscar" variant="outlined" />}
                                                renderOption={(props, option, state) => [props, state?.item ? state.id : ' ', option.id + " " + option.description + " || Medida: " + option.unidad_de_medida + ' || ' + option.marca]}
                                                renderGroup={(params) => params}
                                            />

                                        </div>
                                        {/*<div className='formInput'>
                                            <label htmlFor='residente'>DESCRIPCION DE BIENES</label>

                                            <select
                                                disabled
                                                type="text"
                                                className='selecunidad'
                                                placeholder='Select'
                                                name='idBienes'
                                                value={valu_cont.idBienes}
                                                onChange={(e) => handleSubmit(e, index)}
                                            >
                                                <option value=""> </option>
                                                <FilterDescBien />
                                            </select>
                                        </div>*/}
                                        <div className="formInput_i" >

                                            <label htmlFor='descripcion'>Ubicacion</label>
                                            <input
                                                id='descripcion'
                                                value={valu_cont.descripcion}
                                                name='descripcion'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="text"
                                                placeholder=""

                                            />
                                        </div>
                                        <div className="formInput_2" >

                                            <label htmlFor='cantidad_inicial'>STOCK</label>
                                            <input
                                                id='cantidad_inicial'
                                                value={valu_cont.cantidad_inicial}
                                                name='cantidad_inicial'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="number"
                                                placeholder=""
                                                required

                                            />
                                        </div>
                                        <div className="formInput_2" >

                                            <label htmlFor='cantidad'>CANTIDAD INICIAL</label>
                                            <input
                                                id='cantidad'
                                                value={valu_cont.cantidad}
                                                name='cantidad'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="number"
                                                placeholder=""
                                                required

                                            />
                                        </div>
                                        <div className="formInput_2" >

                                            <label htmlFor='precio'>PRECIO</label>
                                            <input
                                                id='precio'
                                                value={valu_cont.precio}
                                                name='precio'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="number"
                                                placeholder=""
                                                required


                                            />
                                        </div>

                                        <div className="formInput" >
                                            <label htmlFor='cuenta'>CUENTA CONTABLE</label>
                                            <input
                                                id='cuenta'
                                                value={valu_cont.cuenta}
                                                name='cuenta'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="number"
                                                placeholder=''
                                                required
                                            //pattern="[A-Z-0-9]+"
                                            />

                                        </div>
                                        <div className="formInput" >
                                            <label htmlFor='fecha_registro'>FECHA DE REGISTRO</label>
                                            <input
                                                id='fecha_registro'
                                                value={fecha_registro}
                                                name='fecha_registro'
                                                onChange={(e) => setFechaRegistro(e.target.value, index)}
                                                type="number"
                                                placeholder="YYYY"
                                                min="1999" max="2030"
                                                required
                                            //pattern="[A-Z-0-9]+"
                                            />

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

export default React.memo(CrearIneventariado_cont);              