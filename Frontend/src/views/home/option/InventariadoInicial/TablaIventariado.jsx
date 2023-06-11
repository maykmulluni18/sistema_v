import * as React from 'react';
import { DataGrid, esES } from "@mui/x-data-grid";
import { userColumns } from "./DataInventariado";
import { Link } from "react-router-dom";
import { GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import axios from "axios";
import ExcelImportInventariado from "./ImportDataExel/ExcelImportInventariado";
import './tablainventariado.scss'
import { DB_URL } from '../../../../config/config';

const URI = DB_URL + 'invetinicial/'

const URI1 = DB_URL + 'excelimport/download/'


const TablaInventariado = () => {


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
  const [inventariado, setInvetariado] = useState([])

  useEffect(() => {
    getInventariado()
  }, [])

  const getInventariado = async () => {
    const res = await axios.get(URI)
    setInvetariado(res.data.reverse())
  };

  const deleteInventariado = async (id) => {
    Swal.fire({
      title: 'Esta Seguro que Desea Eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#160a3d',
      cancelButtonColor: '#3d0a0a',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar',
      timer: 15500
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Eliminado!',
          icon: 'success',
          timer: 5500
        })
        const res = await axios.delete(`${URI}${id}`)
        getInventariado(res.data)

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

            <div className="cellAction">

              <div
                className="deleteButton"
                onClick={() => deleteInventariado(params.id)}
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
    <div className="Table_inventariado_cont">
      <div className="top">
        <h1><strong>Inventario Inicial : </strong> De Bienes de la Oficina de abastecimiento             ----</h1>
        <br/>
        <button className="buttonE" onClick={downloadFile}>Descargar datos por Excel</button>

      </div>

      {/*<div className="top_1">
        <ExcelImportInventariado />

      </div>*/}
      <div className="Tabledata">
        <div className="dataTitle">
          Inventario Inicial
          <div className="CrearButton">
            <Link to={'created-inventariado'}>
              <button className="crear_bienes">Crear</button>
            </Link>
          </div>
        </div>
        <DataGrid
          className="datagrid"
          rows={inventariado}
          columns={userColumns.concat(actionColumn)}
          pageSize={7}
          rowsPerPageOptions={[5]}
          //disableColumnFilter
          //disableColumnSelector
          //disableDensitySelector
          components={{ Toolbar: GridToolbar }}
          {...inventariado}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 400 },
            },
          }}

          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </div>

  );
};

export default TablaInventariado;
