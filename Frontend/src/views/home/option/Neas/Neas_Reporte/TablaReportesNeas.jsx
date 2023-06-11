import * as React from 'react';
import { DataGrid, esES } from "@mui/x-data-grid";
import { userColumns } from "./DataReportesNeas";
import { Link } from "react-router-dom";
import { GridToolbar } from '@mui/x-data-grid';
import axios from 'axios'
import { useState, useEffect } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./TablaReportesNeas.scss"

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { DB_URL } from '../../../../../config/config';

const URI = DB_URL + 'neasentradas/'

const TablaReportes = () => {

    const [neasentradas, setNeasEntradas] = useState([])
    useEffect(() => {
        getNeasEntradas()
    }, [])

    const getNeasEntradas = async () => {
        const res = await axios.get(URI)
        setNeasEntradas(res.data.reverse())
    }


    const actionColumn = [
        {
            field: "opciones",
            headerName: "Opciones",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cellAction">

                        <Link to={`detalles/${params.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton"><VisibilityIcon /></div>
                        </Link>

                        <Link to={`neaspdf/${params.id}`} style={{ textDecoration: "none" }}>
                            <div className="pdfButton"><PictureAsPdfIcon /></div>
                        </Link>

                    </div>
                );
            },

        },
    ];


    return (
        <>

            <div className="Tabledata_neas">
                <div className="top">
                    <h1><strong>Neas Reportes : </strong> Inventario de  Reportes de  Neas de la Oficina  de abastecimiento</h1>
                </div>
                <div className="Tabledata">
                    <div className="dataTitle">
                        Neas Reportes

                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={neasentradas}
                        //getRowId={(row) => (row.id, row.neaEntradaId, row.bineneId)}
                        columns={userColumns.concat(actionColumn)}
                        pageSize={18}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        //checkboxSelection
                        {...neasentradas}
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
