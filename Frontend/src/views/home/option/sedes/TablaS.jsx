import "./tableS.scss";
import * as React from 'react';
import { DataGrid, esES } from "@mui/x-data-grid";
import { userColumns } from "./DataS";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect } from 'react'
//import ModalEditUsers from "./modaleditusers/ModalEditUsers";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import axios from "axios";
import { DB_URL } from "../../../../config/config";

const URI = DB_URL + 'sedes/'


const TableS = () => {

  const { user } = useSelector((state) => state.auth)

  const [sedes, setSedes] = useState([])

  useEffect(() => {
    getSedes()
  }, [])

  const getSedes = async () => {
    const res = await axios.get(URI)
    setSedes(res.data.reverse())
  }

  const deleteSedes = (id) => {
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
        getSedes()

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
            {user && user.role === "admin" && (
              <div className="cellAction">

                <div
                  className="deleteButton"
                  onClick={() => deleteSedes(params.id)}
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

      <div className="Tabledata_Sedes">
        <div className="top">
          <h1>Inventario de Sede de Oficina  de abastecimiento</h1>
        </div>
        <div className="Tabledata">
          <div className="dataTitle">
            Lista de Sedes
            <div className="CrearButton">
              <Link to={'create-sedes'}>
                <button className="crear_bienes">Crear</button>
              </Link>
            </div>
          </div>
          <DataGrid
            className="datagrid"
            rows={sedes}
            columns={userColumns.concat(actionColumn)}
            pageSize={12}
            rowsPerPageOptions={[5]}
            //checkboxSelection
            disableColumnSelector
            components={{
              Toolbar: GridToolbar,
            }}
            //loading
            {...sedes}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          />
        </div>
      </div>u
    </>
  );
};

export default TableS;
