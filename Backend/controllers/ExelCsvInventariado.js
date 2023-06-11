import ModelsInvenInicial from "../models/ModelsInvenInicial.js";
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
        idBienes: row[0],
        descripcion: row[1],
        cuenta: row[2],
        cantidad_inicial: row[3],
        cantidad: row[4],
        precio: row[5],
        fecha_registro: row[6],
        createdAt: row[7],
        updatedAt: row[8]
      };
    });

    await ModelsInvenInicial.bulkCreate(datas_invent);

    res.status(200).json({ message: "El archivo se ha subido correctamente: " + req.file.originalname });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No se pudo cargar el archivo: " + req.file.originalname,
      error: error.message
    });
  }
};


export const getReporInventariado = (req, res) => {
    ModelsInvenInicial.findAll()
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

export const Download = (req, res) => {
    ModelsInvenInicial.findAll(
      {include: [ModelsBienes]}
    ).then((objs) => {
    let datas_invent = [];

    objs.forEach((obj) => {
        datas_invent.push({
        item: obj.biene.item,
        description: obj.biene.description,
        marca: obj.biene.marca,
        unidad_de_medida: obj.biene.unidad_de_medida,
        descripcion: obj.descripcion,
        cuenta: obj.cuenta,
        cantidad_inicial: obj.cantidad_inicial,
        cantidad: obj.cantidad,
        precio: obj.precio,
        fecha_registro: obj.fecha_registro,
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Tutorials");

    worksheet.columns = [
      { header: "Codigo", key: "item", width: 20 },
      { header: "Descripcion", key: "description", width: 50 },
      { header: "Marca", key: "marca", width: 15 },
      { header: "Cuenta", key: "cuenta", width: 25 },
      { header: "Medida", key: "unidad_de_medida", width: 10 },
      { header: "Cantidad Inicial", key: "cantidad_inicial", width: 10 },
      { header: "Stock", key: "cantidad", width: 10 },
      { header: "Precio", key: "precio", width: 15 },
      { header: "fecha de registro", key: "fecha_registro", width: 15 },
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

