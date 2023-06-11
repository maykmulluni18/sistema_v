import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Layout from "../../../../Layout";
import { Link } from "react-router-dom";
import "./deatallesneasreporte.scss"
import { DB_URL } from "../../../../../../config/config";

const URI = DB_URL + 'neasentradas/'

const URI1 = DB_URL + 'neasbienesentradas/'

const columns = [
    { field: 'cantidad_inicial', headerName: 'Cantidad', width: 100 },
    { field: 'cantidad', headerName: 'Stock', width: 100 },

    {
        field: 'Codigo',
        headerName: 'Codigo',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        valueGetter: (params) =>
            `${params.row.biene?.item}`,
    },
    {
        field: 'Descripcion',
        headerName: 'Descripcion',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 450,
        valueGetter: (params) =>
            `${params.row.biene?.description}`,
    },
    {
        field: 'U. Medida',
        headerName: 'U. Medida',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        valueGetter: (params) =>
            `${params.row.biene?.unidad_de_medida}`,
    },
    { field: 'fte_fto', headerName: 'Fte_Fto', width: 130 },
    { field: 'cuenta_contable', headerName: 'Cuenta Contable', width: 100 },
    { field: 'p_unitario', headerName: 'P.Unitario', width: 100 },
    {
        field: 'P.Total',
        headerName: 'P.Total',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        valueGetter: (params) =>
            Number.parseFloat(`${params.row?.cantidad_inicial || ''}` * `${params.row?.p_unitario || ''}`).toFixed(2)
    },

];


const DeatellesNeasReportes_cont = () => {

    useEffect(() => {
        getNeasEntradas()
        getNeasBienesEntradas()
    }, [])
    
    const [id_administradores, setIdAdministradores] = useState('')
    const [tipo_de_sede, setTipoDeSede] = useState('')
    const [tipo_de_ingreso, setTipoDeIngreso] = useState('')
    const [recibido_por, setRecibidoPor] = useState('')
    const [tipo_de_obra, setTipoDeObra] = useState('')
    const [tipo_de_moneda, setTipoDeMoneda] = useState('')
    const [tipo_de_almacen, setTipoDeAlmacen] = useState('')
    const [documento, setDocumento] = useState('')
    const [tipo_de_cambio, setTipoDeCambio] = useState('')
    const [tipo_de_uso, setTipoDeUso] = useState('')
    const [fecha_de_nea, setFechaDeNea] = useState('')
    const [fecha_de_registro, setFechaDeRegristro] = useState('')
    const { id } = useParams()
    const getNeasEntradas = async () => {
        const res = await axios.get(URI + id,)
        setIdAdministradores(res.data.usuario.nombres + ' ' +
            res.data.usuario.apellido_paterno + ' ' +
            res.data.usuario.apellido_materno)
        setTipoDeSede(res.data.tipo_de_sede)
        setTipoDeIngreso(res.data.tipo_de_ingreso)
        setRecibidoPor(res.data.recibido_por)
        setTipoDeObra(res.data.Meta.obra)
        setTipoDeMoneda(res.data.tipo_de_moneda)
        setTipoDeAlmacen(res.data.tipo_de_almacen)
        setDocumento(res.data.documento)
        setTipoDeCambio(res.data.tipo_de_cambio)
        setTipoDeUso(res.data.tipo_de_uso)
        setFechaDeNea(res.data.fecha_de_nea)
        setFechaDeRegristro(res.data.fecha_de_registro)

    }
    const [neasbienesentradas, setNeasBienesEntradas] = useState([])
    const getNeasBienesEntradas = async () => {
        const res = await axios.get(URI1 + id,)
        setNeasBienesEntradas(res.data)
    }
    let numero = 0
    for (let i = 0; i < getNeasEntradas.length; i++) {
        numero = numero + i
    }
    console.log(numero)
    return (
        <>
            <div className="Tabledata_neas_deatlls">
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
                            <strong>Entregado Por: </strong>
                            <input
                                value={id_administradores}
                                onChange={(e) => setIdAdministradores(e.target.value)}
                                type="text"
                            />
                        </div>

                        <div className='formInput'>
                            <strong>Tipo de Ingreso</strong>
                            <input
                                value={tipo_de_ingreso}
                                onChange={(e) => setTipoDeIngreso(e.target.value)}
                            />
                        </div>

                        <div className='formInput'>
                            <strong>Recibido Por:</strong>
                            <input
                                value={recibido_por}
                                onChange={(e) => setRecibidoPor(e.target.value)}
                            />
                        </div>

                        <div className='formInput'>
                            <strong>Obra:</strong>
                            <input
                                value={tipo_de_obra}
                                onChange={(e) => setTipoDeObra(e.target.value)}
                            />
                        </div>

                        <div className='formInput'>
                            <strong>Tipo de Moneda:</strong>
                            <input
                                value={tipo_de_moneda}
                                onChange={(e) => setTipoDeMoneda(e.target.value)}
                            />
                        </div>

                        <div className='formInput'>
                            <strong>Fecha:</strong>
                            <input
                                value={fecha_de_nea}
                                onChange={(e) => setFechaDeNea(e.target.value)}
                            />
                        </div>

                        <div className='formInput'>
                            <strong>Tipo de Almacen:</strong>
                            <input
                                value={tipo_de_almacen}
                                onChange={(e) => setTipoDeAlmacen(e.target.value)}
                            />
                        </div>

                        <div className='formInput'>
                            <strong>Tipo de Documento:</strong>
                            <input
                                value={documento}
                                onChange={(e) => setDocumento(e.target.value)}
                            />
                        </div>

                        <div className='formInput'>
                            <strong>Tipo de Cambio:</strong>
                            <input
                                value={tipo_de_cambio}
                                onChange={(e) => setTipoDeCambio(e.target.value)}
                            />
                        </div>

                        <div className='formInput'>
                            <strong>Tipo de Uso:</strong>
                            <input
                                value={tipo_de_uso}
                                onChange={(e) => setTipoDeUso(e.target.value)}
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
                            rows={neasbienesentradas}
                            columns={columns}

                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default DeatellesNeasReportes_cont