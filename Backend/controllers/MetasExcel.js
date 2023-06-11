import Metas from "../models/ModelsMetas.js";
import ModelsBienes from "../models/ModelsBienes.js"
import readXlsxFile from "read-excel-file/node";
import excel from "exceljs"
import path from 'path';
const __dirname = path.resolve();


export const Excelupload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Cargue un archivo de Excel" });
    }

    const path = __dirname + "/uploads/" + req.file.filename;
    const rows = await readXlsxFile(path);
    // skip header
    rows.shift();

    // Use map instead of forEach to create the data array
    const datas_invent = rows.map((row) => {
      return {
        meta_1: row[0],
        meta_2: row[1],
        obra: row[2],
        id_residente: row[3],
        id_almacenario: row[4],
        id_asistente_adm: row[5],
        createdAt: row[6],
        updatedAt: row[7]
      };
    });

    await Metas.bulkCreate(datas_invent);

    res.status(200).json({ message: "El archivo se ha subido correctamente: " + req.file.originalname });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No se pudo cargar el archivo: " + req.file.originalname,
      error: error.message
    });
  }
};
