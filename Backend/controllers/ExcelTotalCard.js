import ModelsInvenInicial from "../models/ModelsInvenInicial.js";
import ModelsBienes from "../models/ModelsBienes.js"
import readXlsxFile from "read-excel-file/node";
import excel from "exceljs"
import path from 'path';
import db from "../database/db.js"
const __dirname = path.resolve();
export const getCantidad = async (req, res) => {
    try {
        const usuarios = await db.query(
            `
        SELECT  b.id, 
		    b.item AS Codigo, 
		    b.unidad_de_medida AS Unidad, 
		    b.description AS Descripcion, 
            COALESCE(SUM(i.cantidad_inicial), 0) + COALESCE(SUM(n.cantidad_inicial), 0) AS Cantidad_Inicial, 
		    SUM(i.cantidad) AS Inventarido_Cantidad, 
		    SUM(n.cantidad) AS Nea_Cantidad, 
		    COALESCE(SUM(i.cantidad), 0) + COALESCE(SUM(n.cantidad), 0) AS Stock
        FROM bienes b 
        LEFT JOIN inventarido_inicial i ON i.idBienes = b.id 
        LEFT JOIN nea_bien n ON n.idBienes = b.id
        GROUP BY n.idBienes, i.idBienes

            `)
        res.json(usuarios[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}
export const DownloadTotal = async (req, res) => {
    try {
      const bienes = await db.query(`
        SELECT  b.id, 
                b.item AS Codigo, 
                b.unidad_de_medida AS Unidad, 
                b.description AS Descripcion, 
                COALESCE(SUM(i.cantidad_inicial), 0) + COALESCE(SUM(n.cantidad_inicial), 0) AS Cantidad_Inicial, 
                SUM(i.cantidad) AS Inventarido_Cantidad, 
                SUM(n.cantidad) AS Nea_Cantidad, 
                COALESCE(SUM(i.cantidad), 0) + COALESCE(SUM(n.cantidad), 0) AS Stock
        FROM bienes b 
        LEFT JOIN inventarido_inicial i ON i.idBienes = b.id 
        LEFT JOIN nea_bien n ON n.idBienes = b.id
        GROUP BY n.idBienes, i.idBienes
      `);
  //console.log(bienes)
      const datas_invent = bienes[0].map((bien) => ({
        item: bien.Codigo,
        medida: bien.Unidad,
        description: bien.Descripcion,
        Cantinidad_Inicial: bien.Cantidad_Inicial,
        cantidadInven: bien.Inventarido_Cantidad,
        cantidadNea: bien.Nea_Cantidad,
        stock: bien.Stock,

      }));
  //console.log(datas_invent)
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet("Tutorials");
  
      worksheet.columns = [
        { header: "Codigo", key: "item", width: 15 },
        { header: "Medida", key: "medida", width: 15 },
        { header: "Descripcion", key: "description", width: 50 },
        { header: "Cantidad Inicial Total", key: "Cantinidad_Inicial", width: 20 },
        { header: "Cantidad Inventario", key: "cantidadInven", width: 20 },
        { header: "Cantidad NEa", key: "cantidadNea", width: 20 },
        { header: "Stock", key: "stock", width: 15 },




      ];
  
      worksheet.addRows(datas_invent);
  
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "tutorials.xlsx"
      );
  
      await workbook.xlsx.write(res);
  
      res.status(200).end();
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al generar el archivo de Excel");
    }
  };
  