import * as React from 'react';
import { DataGrid, esES } from "@mui/x-data-grid";
import { userColumns } from "./DataUsers";
import { Link } from "react-router-dom";
import { GridToolbar } from '@mui/x-data-grid';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./tablausers.scss"
import { useSelector } from 'react-redux';
import { DB_URL } from '../../../../config/config';

const URI = DB_URL + 'createuseradmin/'


const TablaUsers = () => {
    const { user } = useSelector((state) => state.auth)
    const [usersadmins, setUsers] = useState([])
    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const res = await axios.get(URI)
        console.log(res)
        setUsers(res.data.reverse())
    }


    const deleteUsers = (id) => {
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

                await axios.delete(`${URI}${id}`)
                getUsers()

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

                        {/* <Link to={`edit/${params.id}`}>

                            <div className="EditButton">
                                <EditIcon />
                            </div>
                        </Link>*/}

                        <div className="cellAction">

                            <div
                                className="deleteButton"

                                onClick={() => deleteUsers(params.id)}
                            >
                                <DeleteIcon />
                            </div>

                        </div>
                    </div>
                );
            },

        },
    ];


    return (
        <>

            <div className="Tabledata_users">
                <div className="top">
                    <h1>Lista de Usuarios</h1>
                </div>
                <div className="Tabledata">
                    <div className="dataTitle">
                        Lista de Usuarios
                        <Link to={'created-users'}>
                            <div className="CrearButton">
                                <button className='crear_bienes'>Crear</button>
                            </div>
                        </Link>
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={usersadmins}
                        //getRowId={(row) => (row.id, row.identifier)}
                        columns={userColumns.concat(actionColumn)}
                        pageSize={18}
                        rowsPerPageOptions={[10]}
                        //checkboxSelection
                        disableSelectionOnClick
                        disableColumnSelector

                        experimentalFeatures={{ newEditingApi: true }}
                        //checkboxSelection
                        {...usersadmins}
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

export default TablaUsers;
