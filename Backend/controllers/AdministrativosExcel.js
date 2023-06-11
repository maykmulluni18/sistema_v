import Models from "../models/Models.js";
import readXlsxFile from "read-excel-file/node";
import excel from "exceljs"
import path from 'path';
import Joi from 'joi';

const __dirname = path.resolve();

export const AdministrativosExcelupload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Cargue un archivo de Excel" });
    }

    const path = __dirname + "/uploads/" + req.file.filename;
    const rows = await readXlsxFile(path);

    rows.shift();

    const datas_invent = rows.map((row) => {
      return {
        apellido_paterno: row[0],
        apellido_materno: row[1],
        nombres: row[2],
        createdAt: row[3],
        updatedAt: row[4]
      };
    });


    await Models.bulkCreate(datas_invent);

    res.status(200).json({ message: "El archivo se ha subido correctamente: " + req.file.originalname });
  } catch (error) {
    res.status(500).json({
      message: "No se pudo cargar el archivo: " + req.file.originalname,
      error: error.messages
    });
  }
};

export const getReporAdministrativos = (req, res) => {
  Models.findAll()
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