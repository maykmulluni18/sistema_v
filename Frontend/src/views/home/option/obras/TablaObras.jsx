import "./tablaobras.scss";
import * as React from 'react';
import { DataGrid, esES } from "@mui/x-data-grid";
import { userColumns } from "./DataObras";
import { Link } from "react-router-dom";
import { GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import axios from "axios";
import { DB_URL } from "../../../../config/config";

const URI = DB_URL + 'obras/'


const TablaObras = () => {

  
  const [obras, setObras] = useState([])

  useEffect(() => {
    getObras()
  }, [])

  const getObras = async () => {
    const res = await axios.get(URI)
    setObras(res.data.reverse())
  };

  const deleteObras = async (id) => {
      Swal.fire({
        title: 'Esta Seguro que Desea Eliminar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#160a3d',
        cancelButtonColor: '#3d0a0a',
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText: 'No, Cancelar',
        timer: 15500
      }).then( async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Eliminado!',
            icon: 'success',
            timer: 5500
          })
          const res = await axios.delete(`${URI}${id}`)
          getObras(res.data)

        }
      })
  }

  const actionColumn = [
    {
      field: "opciones",
      headerName: "Opciones",
      width: 330,
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
                className="btn deleteButton"
                id="deletedata"
                onClick={() => deleteObras(params.id)}
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
    <div className="Table_obras">
      <div className="top">
        <h1>Obras de la Oficina  de abastecimiento</h1>
      </div>
      <div className="Tabledata">
        <div className="dataTitle">
          Lista de Obras
          <div className="CrearButton">
            <Link to={'created-obras'}>
              <button className="btn crear_bienes">Crear</button>
            </Link>
          </div>
        </div>
        <DataGrid
          className="datagrid"
          rows={obras}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[5]}
          //disableColumnFilter
          disableColumnSelector
          //disableDensitySelector
          components={{ Toolbar: GridToolbar }}
          {...obras}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}

          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </div>

  );
};

export default TablaObras;
