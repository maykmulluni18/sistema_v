import ModelsNeaBien from "../models/ModelsNeaBien.js";
import readXlsxFile from "read-excel-file/node";
import excel from "exceljs"
import path from 'path';
import Joi from 'joi';

const __dirname = path.resolve();

const dataValidationSchema = Joi.object().keys({
  neaEntradaId: Joi.number().required().error(new Error('Was REALLY expecting a string')),
  item: Joi.number().required().error(new Error('Was REALLY expecting a string')),
  descripcion: Joi.string().required(),
  medida: Joi.string().required(),
  cantidad: Joi.number().required(),
  fte_fto: Joi.number().required(),
  cuenta_contable: Joi.number().required(),
  p_unitario: Joi.number().required(),
  fecha: Joi.date().required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date()
});

export const NeasExcelupload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Cargue un archivo de Excel" });
    }

    const path = __dirname + "/uploads/" + req.file.filename;
    const rows = await readXlsxFile(path);

    rows.shift();

    const datas_invent = rows.map((row) => {
      return {
        neaEntradaId: row[0],
        item: row[1],
        descripcion: row[2],
        medida: row[3],
        cantidad_inicial: row[4],
        cantidad: row[5],
        fte_fto: row[6],
        cuenta_contable: row[7],
        p_unitario: row[8],
        fecha: row[9],
        createdAt: row[10],
        updatedAt: row[11]
      };
      const { error, value } = dataValidationSchema.validate(datas_invent);
      if (error) {
        // Return error if validation fails
        return res.status(500).json({ error: error.message });
      } else {
        // Push the valid data to the array
        datas_invent.push(value);
      }
    });


    await ModelsNeaBien.bulkCreate(datas_invent);

    res.status(200).json({ message: "El archivo ha subido correctamente: " + req.file.originalname });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No se pudo cargar el archivo: " + req.file.originalname,
      error: error.messages
    });
  }
};

export const getReporNeas = (req, res) => {
  ModelsNeaBien.findAll()
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

export const download = (req, res) => {
  ModelsNeaBien.findAll().then((objs) => {
    let datas_invent = [];

    objs.forEach((obj) => {
      datas_invent.push({
        id: obj.id,
        title: obj.title,
        description: obj.description,
        published: obj.published,
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Tutorials");

    worksheet.columns = [
      { header: "Id", key: "id", width: 5 },
      { header: "Title", key: "title", width: 25 },
      { header: "Description", key: "description", width: 25 },
      { header: "Published", key: "published", width: 10 },
    ];

    // Add Array Rows
    worksheet.addRows(datas_invent);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "tutorials.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
};

