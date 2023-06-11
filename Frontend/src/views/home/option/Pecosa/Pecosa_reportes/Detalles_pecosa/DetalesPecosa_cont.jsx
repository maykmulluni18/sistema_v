import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./detallesreportespecosa.scss";
import { DB_URL } from '../../../../../../config/config';

const URI = DB_URL + 'pecosapedidos/'

const URI1 = DB_URL + 'pecosabienespedidos/'

const URI2 = DB_URL + 'metas/'


const columnsb = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'U. Medida',
        headerName: 'U. Medida',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        valueGetter: (params) =>
            `${params.row.inventarido_inicial?.biene.unidad_de_medida || params.row.nea_bien?.biene.unidad_de_medida }`,
    },
    {
        field: 'Descripcion',
        headerName: 'Descripcion',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 450,
        valueGetter: (params) =>
            `${params.row.inventarido_inicial?.biene.description || params.row.nea_bien?.biene.description  }`,
    },
    {
        field: 'cuenta_contable',
        headerName: 'Cuenta Contable',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 230,
        valueGetter: (params) =>
            `${params.row.inventarido_inicial?.cuenta || params.row.nea_bien?.cuenta_contable}`,
    },
    { field: 'cantidad', headerName: 'Cantidad', width: 100 },
    {
        field: 'p_unitario',
        headerName: 'P.Unitario',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 100,
        valueGetter: (params) =>
            `${params.row.inventarido_inicial?.precio || params.row.nea_bien?.p_unitario}`,
    },
    {
        field: 'P.Total',
        headerName: 'P.Total',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        valueGetter: (params) =>
            `${params.row?.cantidad}` * `${params.row.inventarido_inicial?.precio || params.row.nea_bien?.p_unitario}`,
    },
    { field: 'observaciones', headerName: 'Observaciones', width: 270 },


];


const DetallesPecosa_cont = () => {

    console.log( '234'.padStart(6, 0) );

    useEffect(() => {
        getPedidosPecosa()
        getPecosaBienes()
    }, [])
    const [dependencias, setDependencias] = useState('')
    const [tipo_de_sede, setTipoDeSede] = useState('')
    const [fecha, setFecha] = useState('')
    const [almacen, setAlmacen] = useState('')
    const [id_administradores, setIdAdministradores] = useState('')
    const [id_administrativo2, setIdAdministrativo2] = useState('')
    const [id_metas, setIdMetas] = useState('')
    const { id } = useParams()




    const getPedidosPecosa = async () => {

        const res = await axios.get(URI + id,)
        setDependencias(res.data.dependencias)
        setTipoDeSede(res.data.tipo_de_sede)
        setAlmacen(res.data.almacen)
        setFecha(res.data.fecha)
        setIdAdministradores(res.data.usuario.nombres + ' ' +
            res.data.usuario.apellido_paterno + ' ' +
            res.data.usuario.apellido_materno)
        setIdAdministrativo2(res.data.usuario.nombres + ' ' +
        res.data.usuario.apellido_paterno + ' ' +
        res.data.usuario.apellido_materno)
        setIdMetas(res.data.Meta.obra + '  => Meta: ' +res.data.Meta.meta_1)    
    }


    const [pecosaPedidoId, setPecosaPedidosId] = useState([])

    const getPecosaBienes = async () => {
        const res = await axios.get(URI1 + id,)
        console.log(res.data)
        setPecosaPedidosId(res.data)
    }


    return (
        <>
            <div className="Tabledata_pecosa_reportes_detalles">
                <div className="top">
                    <h1>Inventario de Pecosas de Oficina  de abastecimiento: {id}</h1>
                    <div className='crearButtom_B'>
                        <Link to={'../'} >
                            <button className='button2'> Salir</button>
                        </Link>
                    </div>
                </div>
                <div className="cont_detalls">
                    <div className='form_cont'>
                        <div className='formInput'>

                            <strong>Dependencias Solicitante: </strong>
                            <input
                                value={dependencias}
                                onChange={(e) => setDependencias(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className='formInput'>

                            <strong>Solicitante: </strong>
                            <input
                                value={id_administradores}
                                onChange={(e) => setIdAdministradores(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className='formInput'>

                            <strong>Obra: </strong>
                            <input
                                value={id_metas}
                                onChange={(e) => setIdMetas(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className='formInput'>

                            <strong>Sede : </strong>
                            <input
                                value={tipo_de_sede}
                                onChange={(e) => setTipoDeSede(e.target.value)}
                            />
                        </div>
                        <div className='formInput'>

                            <strong>Solicitante Entrgar a: </strong>
                            <input
                                value={id_administrativo2}
                                onChange={(e) => setIdAdministrativo2(e.target.value)}
                            />
                        </div>
                        <div className='formInput'>

                            <strong>Fecha: </strong>
                            <input
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="Tabledata">
                    <div className="dataTitle">
                        Inventario Oficina de de abastecimiento

                    </div>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={pecosaPedidoId}
                            columns={columnsb}

                        />
                    </div>
                </div>

            </div>
        </>
    )
}

export default DetallesPecosa_cont
