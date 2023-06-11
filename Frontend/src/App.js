import Home from "./views/home/Home";
import Login_inicio from "./views/login/Login_inicio";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Listinfo from "./views/home/option/usuarios/ListInfo";
import Bienes from "./views/home/option/bienes/Listinfobienes";
import EditBienes from "./views/home/option/bienes/EditBienes/EditBienes";
//import Sedes from "./views/home/option/sedes/Listinfosedes";
//import EditSede from "./views/home/option/sedes/Editsedes/EditSede";
//import CreateSedes from "./views/home/option/sedes/CreateSedes/CreateSedes";
import Editusers from "./views/home/option/usuarios/modaleditusers/Editusers";

import CreatedBienes from "./views/home/option/bienes/modalnew/CreateBienes";

import ListaNeasBienes from "./views/home/option/Neas/Neas_bienes/ListaNeasBienes";
import CrearNeasBienes from "./views/home/option/Neas/Neas_bienes/Crear_neas_bienes/CrearNeasBienes";
import EditNeasBienes from "./views/home/option/Neas/Neas_bienes/Editar_neas_bienes/EditarNeasBienes";

import ListaNeasEntradas from "./views/home/option/Neas/Neas_Entradas/ListaNeasEntradas";
import CrearNeasEntradas from "./views/home/option/Neas/Neas_Entradas/Crear_neas_entradas/CrearNeasEntradas";
import EditNeasEntradas from "./views/home/option/Neas/Neas_Entradas/Editar_neas_entradas/EditarNeasEntradas";

import ListaReportesNeas from "./views/home/option/Neas/Neas_Reporte/ListaReportesNeas";
import DestallesReportesNeas from "./views/home/option/Neas/Neas_Reporte/Detalles_nea/DeatellesNeasReportes";
import PdfNeas from "./views/home/option/Neas/Neas_Reporte/PdfNeas/PdfNeas";

import ListaPecosaBienes from "./views/home/option/Pecosa/Pecosa_bienes/ListaPecosaBienes";
import CrearPecosaBienes from "./views/home/option/Pecosa/Pecosa_bienes/Crear_pecosa_bienes/CrearPecosaBienes";
import EditarPecosaBienes from "./views/home/option/Pecosa/Pecosa_bienes/Editar_pecosa_bienes/EditarPecosaBienes";

import ListaPecosaPedidos from "./views/home/option/Pecosa/Pecosa_pedidos/ListaPecosaPedidos";
import CrearPecosaPedidos from "./views/home/option/Pecosa/Pecosa_pedidos/Crear_pecosa_pedidos/CrearPecosaPedidos"
import EditarPecosaPedidos from "./views/home/option/Pecosa/Pecosa_pedidos/Editar_pecosa_pedidos/EditarPecosaPedidos";

import ListaReportes from "./views/home/option/Pecosa/Pecosa_reportes/ListaReportes";
import DetallesPecosa from "./views/home/option/Pecosa/Pecosa_reportes/Detalles_pecosa/DetalesPecosa";
import PdfReporte from "./views/home/option/Pecosa/Pecosa_reportes/Pdf_pecosa/PdfReporte";

import CreateAdministrativos from "./views/home/option/usuarios/modalnewusers/CreateAdministrativos";

import "./app.css"


import Not_found_404 from "./views/home/Not_found_404/Not_found_404";

import ListinfoMetas from "./views/home/option/metas/ListaInfoMetas";
import CreatedMetas from "./views/home/option/metas/CrearMetas/CrearMetas";
import EditMetas from "./views/home/option/metas/EditarMetas/EditarMetas";


import ListaUsers from "./views/home/option/User/ListaUsers";
import CreateUsers from "./views/home/option/User/CrearUsers/CreateUsers";

import CreatedInventarido from "./views/home/option/InventariadoInicial/CrearInventariado/CrearInventariado";
import ListaInventariado from "./views/home/option/InventariadoInicial/ListaInventariado";
import EditarInventarido from "./views/home/option/InventariadoInicial/EditarInventariado/EditarInventariado";
import ListaReporteInventariado from "./views/home/option/InventariadoInicial/Invetario_Reporte/ListaReporteInventariado";
import DetallesInventariado from "./views/home/option/InventariadoInicial/Invetario_Reporte/DetallesInvetario/DetallesInventariado";
import Reporte_inventariado from "./views/home/option/InventariadoInicial/Invetario_Reporte/PdfInventario/Reporte_inventariado";

//import ListaAlmacen from "./views/home/option/almacen/ListaAlmacen"
//import CrearAlmacen from "./views/home/option/almacen/crearAlmacen/CrearAlmacen";
//import EditarAlmacen from "./views/home/option/almacen/editarAlmacen/EditarAlmacen";
//import ListaObras from "./views/home/option/obras/ListaObras";
//import CrearObras from "./views/home/option/obras/crearObras/CrearObras";
//import EditarObras from "./views/home/option/obras/editarObras/EditarObras";

import ReporteTotal from "./views/home/stocks/CantTotal"
//import StocksNeas from "./views/home/stocks/StocksNeas";
//import ImportNeasExcel from "./views/home/option/Neas/Neas_bienes/importarExcel/ImportNeasExcel";
import ImportBienesExcel from "./views/home/option/bienes/importarExcel/ImportBienesExcel";
import ImportUsersExcel from "./views/home/option/usuarios/importarExcel/ImportUsersExcel";
import ImportMetas from "./views/home/option/metas/ImportMetasExcel/MetasExcel"

function App() {
  console.log(process.env.REACT_APP_TOKEN)
  
  return (
    <div className="container">

          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route index element={<Login_inicio />} />
                <Route path="/home" element={<Home />} />

                <Route path="*" element={<Not_found_404 />} />

                <Route path="/reportetotal">
                  <Route index element={<ReporteTotal/>} />
                </Route>

                <Route path="/bienes">
                  <Route index element={<Bienes />} />
                  <Route path="created-bienes" element={<CreatedBienes />} />
                  <Route path="edit/:id" element={<EditBienes />} />
                  <Route path="importbienes" element={<ImportBienesExcel/>} />
                </Route>

                <Route path="/metas">
                  <Route index element={<ListinfoMetas />} />
                  <Route path="created-metas" element={<CreatedMetas />} />
                  <Route path="edit/:id" element={<EditMetas/>}/>
                  <Route path="importmetas" element={<ImportMetas/>} />

                </Route>

               {/*  <Route path="/sedes">
                  <Route index element={<Sedes />} />
                  <Route path="edit/:id" element={<EditSede />} />
                  <Route path="create-sedes" element={<CreateSedes />} />

                </Route>
              */}

                <Route path="/administrativos" >
                  <Route index element={<Listinfo />} />
                  <Route path="create-administrativos" element={<CreateAdministrativos />} />
                  <Route path="edit/:id" element={<Editusers />} />
                  <Route path="insert-excel" element={<ImportUsersExcel/>} />

                </Route>
              {/* 
                <Route path="/almacenes">
                  <Route index element={<ListaAlmacen />}/>
                  <Route path="created-almacen" element={<CrearAlmacen />}/>
                  <Route path="edit/:id" element={<EditarAlmacen />}/>
                </Route>

                <Route path="/obras">
                  <Route index element={<ListaObras />}/>
                  <Route path="created-obras" element={<CrearObras />}/>
                  <Route path="edit/:id" element={<EditarObras />}/>
                </Route>
              */}

                <Route path="/neas-bienes" >
                  <Route index element={<ListaNeasBienes />} />
                  <Route path="created-neas-bienes" element={<CrearNeasBienes />} />
                  <Route path="edit/:id" element={<EditNeasBienes />} />
                </Route>

                <Route path="/neas-entradas" >
                  <Route index element={<ListaNeasEntradas />} />
                  <Route path="created-neas-entrada" element={<CrearNeasEntradas />} />
                  <Route path="edit/:id" element={<EditNeasEntradas />} />
                </Route>

                <Route path="/reportes-neas" >
                  <Route index element={<ListaReportesNeas />} />
                  <Route path="detalles/:id" element={<DestallesReportesNeas />} />
                  <Route path="neaspdf/:id" element={<PdfNeas />} />
                </Route>

                <Route path="/pecosa-bienes">
                  <Route index element={<ListaPecosaBienes />} />
                  <Route path="created-pecosa-bienes" element={<CrearPecosaBienes />} />
                  <Route path="edit/:id" element={<EditarPecosaBienes />} />
                </Route>

                <Route path="/pecosa-pedidos">
                  <Route index element={<ListaPecosaPedidos />} />
                  <Route path="created-pecosa-pedidos" element={<CrearPecosaPedidos />} />
                  <Route path="edit/:id" element={<EditarPecosaPedidos />} />
                </Route>

                <Route path="/reportes-pecosa">
                  <Route index element={<ListaReportes />} />
                  <Route path="detalles/:id" element={<DetallesPecosa />} />
                  <Route path="reportpdf/:id" element={<PdfReporte />} />
                </Route>

                <Route path="/usuarios-adminstradores">
                  <Route index element={<ListaUsers />} />
                  <Route path="created-users" element={<CreateUsers/>} />
                  <Route path="edit/:id" />
                </Route>

                <Route path="/inventariado-inicial">
                  <Route index element={<ListaInventariado/>} />
                  <Route path="created-inventariado" element={<CreatedInventarido />} /> 
                  <Route path="edit/:id" element={<EditarInventarido />}/>
                </Route>
                
                <Route path="/reporte-inventariado">
                  <Route index element={<ListaReporteInventariado/>}/>
                  <Route path="detalles/:fecha_registro" element={<DetallesInventariado />}/>
                  <Route path="reporpdf/:fecha_registro" element={<Reporte_inventariado/>} />
                </Route>

              </Route>
            </Routes>
          </BrowserRouter>

    </div>
  );
}


export default App;