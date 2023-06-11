import * as React from 'react';
import { DataGrid, esES } from "@mui/x-data-grid";
import { userColumns } from "./DataReportes";
import { Link } from "react-router-dom";
import { GridToolbar } from '@mui/x-data-grid';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./Tablareportes.scss"

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { DB_URL } from '../../../../../config/config';

const URI = DB_URL + 'pecosapedidos/'

const TablaReportes = () => {

    const [pecosapedidos, setPecosaPedidos] = useState([])
    useEffect(() => {
        getPecosaPedidos()
    }, [])

    const getPecosaPedidos = async () => {
        const res = await axios.get(URI)
        setPecosaPedidos(res.data.reverse())
    }


    const deletePecosaPedidos = async (id) => {
        const res = await axios.delete(`${URI}${id}`)
        getPecosaPedidos(res.data)
    }


    const actionColumn = [
        {
            field: "opciones",
            headerName: "Opciones",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">

                        <Link to={`detalles/${params.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton"><VisibilityIcon /></div>
                        </Link>
                        <Link to={`reportpdf/${params.id}`} style={{ textDecoration: "none" }}>
                            <div className="pdfButton"><PictureAsPdfIcon /></div>
                        </Link>

                    </div>
                );
            },

        },
    ];


    return (
        <>

            <div className="Tabledata_pecosa_reportes">
                <div className="top">
                    <h1><strong>Reporte Pecosa : </strong> Inventario de  Reportes de Pecosas de la Oficina  de abastecimiento</h1>
                </div>
                <div className="Tabledata">
                    <div className="dataTitle">
                    Reporte Pecosa
                        
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={pecosapedidos}
                        //getRowId={(row) => (row.id, row.neaEntradaId, row.bineneId)}
                        columns={userColumns.concat(actionColumn)}
                        pageSize={18}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
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

export default TablaReportes;
