import "./stocks.scss";
import * as React from 'react';
import { DataGrid, esES } from "@mui/x-data-grid";
import { userColumns } from "./DataTotal";
import { GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect } from 'react'
//import ModalEditUsers from "./modaleditusers/ModalEditUsers";
import axios from "axios";
import { IconButton } from "@mui/material";
import { DB_URL } from "../../../config/config";
import Layout from "../Layout";
//import ExportExcel from 'react-export-excel';
{/*
const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;
 */}
const URI = DB_URL + 'cantidadtotal'

const URI1 = DB_URL + 'Total/download'

const StocksNeas = () => {
    const [stocks, setStocks] = useState([])
    const [totalstocks, setTotalStocks] = useState(false)

    useEffect(() => {
        getStock()
        stado()
    }, [])

    const getStock = async () => {
        const res = await axios.get(URI)
        //console.log(res)
        setStocks(res.data)
    }
    const downloadFile = async () => {
        try {
            const response = await axios.get(URI1, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Reporte Inventario.xlsx');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error(error);
        }
    };
    const stado = () => {
        if (stocks.map((item) => (item.stock)) <= 0) {
            setTotalStocks(true)
        }
    }

    const actionColumn = [
        {
            field: "opciones",
            headerName: "Estado",
            width: 120,
            renderCell: (params) => {
                return (
                    <>
                        {/*  <button>
                        {totalstocks ? <h3>Dispon</h3> : <h3>Not</h3>}
                    </button>*/}
                    </>
                );
            },
        },
    ];

    return (
        <>
            <Layout>
                <div className="Tabledata_Stocks">

                    <div className="Tabledata">
                        <div className="dataTitle">
                            Lista de cantidad Total
                            <div className="CrearButton">
                                <button className="buttonE" onClick={downloadFile}>Descargar datos por Excel</button>

                                {/*  <ExcelFile
                                    element={<button>Exportar</button>}
                                    filename="Excel"
                                >
                                    <ExcelSheet
                                        data={userColumns}
                                        name="Total"
                                    >
                                        <ExcelColumn label="Codigo" value="Codigo" />

                                    </ExcelSheet>

                                </ExcelFile>*/}
                            </div>
                        </div>

                        <DataGrid
                            className="datagrid"
                            rows={stocks}
                            columns={userColumns}
                            pageSize={10}
                            rowsPerPageOptions={[5]}
                            // getRowId={(row) => (row.id, row.id)}
                            //getRowId={row => row[0].id}                        //checkboxSelection
                            //disableColumnSelector

                            components={{
                                Toolbar: GridToolbar,
                            }}
                            componentsProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                    quickFilterProps: { debounceMs: 500 },
                                },
                            }}
                            //loading
                            //{...stocks}
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                        />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default StocksNeas;
