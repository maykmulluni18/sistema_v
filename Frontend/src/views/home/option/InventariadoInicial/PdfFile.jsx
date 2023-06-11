import React from "react";
import Reporte from "./Invetario_Reporte/PdfInventario/Reporte_inventariado_cont";
import { PDFDownloadLink } from "@react-pdf/renderer";

const PdfFile = () => {
    return (
      <div className="App">
        <PDFDownloadLink document={<Reporte />} filename="FORM">
        {({loading}) => (loading ? <button>Loading Document...</button> : <button>Download</button> )}
        </PDFDownloadLink>
        {/* <PDFFile /> */}
      </div>
    );
  };
  
  export default PdfFile;