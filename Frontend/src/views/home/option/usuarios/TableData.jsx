import "./tabladata.scss";
import * as React from 'react';
import { DataGrid, esES } from "@mui/x-data-grid";
import { userColumns } from "./DataS";
import { Link } from "react-router-dom";
import { GridToolbar } from '@mui/x-data-grid';
import axios from 'axios'
import { useState, useEffect } from 'react'
//import ModalEditUsers from "./modaleditusers/ModalEditUsers";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { DB_URL } from "../../../../config/config";

const URI = DB_URL + 'user/'


const TableData = () => {
  const [usuarios, setUsuarios] = useState([])
  useEffect(() => {
    getUsuarios()
  }, [])

  const getUsuarios = async () => {
    const res = await axios.get(URI)
    setUsuarios(res.data.reverse())
  }

  const deleteUsuarios =  (id) => {
      Swal.fire({
        title: 'Esta Seguro que Desea Eliminar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#160a3d',
        cancelButtonColor: '#3d0a0a',
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText: 'No, Canselar',
        timer: 15500
      }).then( async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Eliminado con Exito!',
            icon: 'success',
            timer: 5500
          })
          const res = await axios.delete(`${URI}${id}`)
          getUsuarios(res.data)
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
                onClick={() => deleteUsuarios(params.id)}
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

      <div className="Table_administrativos">
        <div className="top">
          <h1><strong>Lista de Administrativos : </strong> De Oficina de  abastecimiento</h1>
        </div>
        <div className="Tabledata">
          <div className="dataTitle">
            Lista de Administrativos
            <div className="CrearButton_1" >
              <Link to={'insert-excel'}>
                <button className="crear_bienes" >Insertar_por_Excel</button>
              </Link>
            </div>
            <div className="CrearButton">
              <Link to={'create-administrativos'}>
                <button className="crear_bienes">Crear</button>
              </Link>
            </div>
          </div>
          <DataGrid
            className="datagrid"
            rows={usuarios}
            columns={userColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[5]}
            disableDensitySelector
            //checkboxSelection
            
            components={{ Toolbar: GridToolbar }}
            {...usuarios}
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
    </>
  );
};

export default TableData;
