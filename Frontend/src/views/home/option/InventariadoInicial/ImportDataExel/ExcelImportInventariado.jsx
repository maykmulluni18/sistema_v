import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from "axios";
import "./exceldata.scss"
import { DB_URL } from '../../../../../config/config';

const URI = DB_URL + 'excelimport/upload/'
const ExcelImportInventariado = () => {
  const navigate = useNavigate()
  const [msg, setMsg] = useState()
  const [errorMsg, setErrorMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [archivo, setArchivo] = useState(null)
  const subirArchivos = e => {
    setArchivo(e)
  }
  const getArchivo = async () => {
    try {
      const ar = new FormData()
      for (let i = 0; i < archivo?.length; i++) {
        ar.append('file', archivo[i])
      }
      const MIN_FILE_SIZE = 1024 // 1MB
      const MAX_FILE_SIZE = 5120 // 5MB
  
      if (!archivo) {
        //setErrorMsg("Por favor elige un archivo");
        setIsSuccess(false)
        Swal.fire(
          {
            title: 'Eliga un archivo por favor !',
            icon: 'question',
            timer: 5500
          }
        )
        return
      }
  
      const fileSizeKiloBytes = archivo.size / 1024
  
      if(fileSizeKiloBytes > MAX_FILE_SIZE){
        setErrorMsg("File size is greater than maximum limit");
        setIsSuccess(false)
        return
      }
  
      setErrorMsg("")
      setIsSuccess(true)
      const respon = await axios.post(URI, ar)

      if (respon.status === 400) {
        Swal.fire(
          {
            title: 'No hay archivo',
            // text: 'Presione Clik para cerrar!',
            icon: 'question',
            timer: 5500
          }
        )
      } else if (respon.status === 200) {
        Swal.fire(
          {
            title: 'Creado con Exito..',
            // text: 'Presione Clik para cerrar!',
            icon: 'success',
            timer: 5500
          }
        )
        navigate('/reporte-inventariado')

      } 
    } catch (error) {
        console.log(error.response.status)
        setError(error.response.data.error)
        if (error.response.status === 500) {
          Swal.fire(
            {
              title: 'Error',
              icon: 'error',
              timer: 1500
            }
          )
        }
    }
  }
  return (
    <>
    <p>{msg}</p>
      <div className="contend_ex">
      {isSuccess ? <p className="success-message">Error de datos</p> : null}
          <p className="error-message">{error}</p>
        <input
          type='file'
          name="file"
          onChange={(e) => subirArchivos(e.target.files)}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
          required
        />
        
        <button className="buttonE" onClick={() => getArchivo()}>Insertar datos por Excel</button>
      </div>
    </>
  )
}

export default ExcelImportInventariado