import ModelsBienes from "../models/ModelsBienes.js";
import readXlsxFile from "read-excel-file/node";
import excel from "exceljs"
import path from 'path';
import Joi from 'joi';

const __dirname = path.resolve();

export const BienesExcelupload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Cargue un archivo de Excel" });
    }

    const path = __dirname + "/uploads/" + req.file.filename;
    const rows = await readXlsxFile(path);

    rows.shift();

    const datas_invent = rows.map((row) => {
      return {
        item: row[0],
        description: row[1],
        marca: row[2],
        unidad_de_medida: row[3],
        createdAt: row[4],
        updatedAt: row[5]
      };
    });


    await ModelsBienes.bulkCreate(datas_invent);

    res.status(200).json({ message: "El archivo ha subido correctamente: " + req.file.originalname });
  } catch (error) {
    res.status(500).json({
      message: "No se pudo cargar el archivo: " + req.file.originalname,
      error: error.message
    });
  }
};

export const getReporBienes = (req, res) => {
  ModelsBienes.findAll()
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials.",
    });
  });
};