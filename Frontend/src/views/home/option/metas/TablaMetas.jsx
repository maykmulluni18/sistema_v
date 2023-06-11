import "./tablametas.scss";
import * as React from 'react';
import { DataGrid, esES } from "@mui/x-data-grid";
import { userColumns } from "./DataMetas";
import { Link } from "react-router-dom";
import { GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import axios from "axios";
import { DB_URL } from "../../../../config/config";

const URI = DB_URL + 'metas/'


const TablaMetas = () => {
  const [metas, setMetas] = useState([])

  useEffect(() => {
    getMetas()
  }, [])

  const getMetas = async () => {
    const res = await axios.get(URI)
    setMetas(res.data.reverse())
  }

  const deleteMetas = async (id) => {
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
          getMetas(res.data)

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
                className="deleteButton"
                onClick={() => deleteMetas(params.id)}
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
    <div className="Table_bienes">
      <div className="top">
        <h1><strong>Lista de Metas : </strong> De la Oficina  de abastecimiento</h1>
      </div>
      <div className="Tabledata">
        <div className="dataTitle">
          Lista de Metas
          <div className="CrearButton_1" >
              <Link to={'importmetas'}>
                <button className="crear_bienes" >Insertar_por_Excel</button>
              </Link>
            </div>
          <div className="CrearButton">
            <Link to={'created-metas'}>
              <button className="crear_bienes">Crear</button>
            </Link>
          </div>
        </div>
        <DataGrid
          className="datagrid"
          rows={metas}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[5]}
          //disableColumnFilter
          //disableColumnSelector
          //disableDensitySelector
          components={{ Toolbar: GridToolbar }}
          {...metas}
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

export default TablaMetas;
