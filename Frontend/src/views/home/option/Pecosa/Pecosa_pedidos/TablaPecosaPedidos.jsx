import * as React from 'react';
import { DataGrid, esES } from "@mui/x-data-grid";
import { userColumns } from "./DataPecosaPedidos";
import { Link } from "react-router-dom";
import { GridToolbar } from '@mui/x-data-grid';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./TablaPecosaPedidos.scss"
import { DB_URL } from '../../../../../config/config';
import { useDispatch, useSelector } from "react-redux";

const URI = DB_URL + 'pecosapedidos/'


const TablaPecosaPedidos = () => {
    const { user } = useSelector((state) => state.auth)

    const [pecosapedidos, setPecosaPedidos] = useState([])
    useEffect(() => {
        getPecosaPedidos()
    }, [])

    const getPecosaPedidos = async () => {
        const res = await axios.get(URI)
        setPecosaPedidos(res.data.reverse())
    }


    const deletePecosaPedidos = async (id) => {
        Swal.fire({
            title: 'Esta Seguro que Desea Eliminar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#160a3d',
            cancelButtonColor: '#3d0a0a',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'No, Canselar',
            timer: 15500
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Eliminado!',
                    icon: 'success',
                    timer: 5500
                })
                const res = await axios.delete(`${URI}${id}`)
                getPecosaPedidos(res.data)

            }
        })

    }


    const actionColumn = [
        {
            field: "opciones",
            headerName: "Opciones",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="cellAction">

                        <Link to={`edit/${params.id}`}>

                            <div className="EditButton">
                                <EditIcon />
                            </div>
                        </Link>

                        {user && user.role === "admin" && (

                            <div className="cellAction">

                                <div
                                    className="deleteButton"
                                    onClick={() => deletePecosaPedidos(params.id)}
                                >
                                    <DeleteIcon />
                                </div>

                            </div>
                        )}
                    </div>
                );
            },

        },
    ];


    return (
        <>

            <div className="Tabledata_pecosa_pedidos">
                <div className="top">
                    <h1><strong>Pecosa Pedidos : </strong> Atencion a Pedidos de Pecosa</h1>
                </div>
                <div className="Tabledata">
                    <div className="dataTitle">
                        Pecosa Pedidos
                        <Link to={'created-pecosa-pedidos'}>
                            <div className="CrearButton">
                                <button className='crear_bienes'>Crear</button>
                            </div>
                        </Link>
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={pecosapedidos}
                        //getRowId={(row) => (row.id, row.neaEntradaId, row.bineneId)}
                        columns={userColumns.concat(actionColumn)}
                        pageSize={18}
                        rowsPerPageOptions={[10]}
                        //checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        //checkboxSelection
                        {...pecosapedidos}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        componentsProps={{
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                            },
                        }}

                        //experimentalFeatures={{ newEditingApi: true }}
                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    />
                </div>
            </div>
        </>
    );

};

export default TablaPecosaPedidos;
