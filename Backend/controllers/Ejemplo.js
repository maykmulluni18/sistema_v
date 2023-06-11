import util from "util"
import db from "../database/db.js"
//const query = util.promisify(db.query).bind(db)
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

export const getStock = async (req, res) => {
    try {
        let sql = `
        SELECT  b.id, 
		    b.item AS Codigo, 
		    b.unidad_de_medida AS Unidad, 
		    b.description AS Descripcion, 
            COALESCE(SUM(i.cantidad_inicial), 0) + COALESCE(SUM(n.cantidad_inicial), 0) AS Cantidad_Inicial, 
		    COALESCE(SUM(i.cantidad), 0) + COALESCE(SUM(n.cantidad), 0) AS Stock,
            COALESCE(SUM(p.cantidad), 0) AS Salida_Nea,
            COALESCE(SUM(pp.cantidad), 0) AS Salida_Invet,
            COALESCE(SUM(p.cantidad), 0) + COALESCE(SUM(pp.cantidad), 0) AS Salida
        FROM bienes b 
        LEFT JOIN inventarido_inicial i ON i.idBienes = b.id 
        LEFT JOIN nea_bien n ON n.idBienes = b.id
        LEFT JOIN pecosa_bienes p ON p.inventaridoInicialId = i.id
        LEFT JOIN pecosa_bienes pp ON pp.nea_bien_id = n.id
        GROUP BY n.idBienes, i.idBienes;
        `
        const stock = await db.query(sql)
        res.json(stock[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getStockNea = async (req, res) => {
    try {
        let sql = `SELECT p.updatedAt, i.fecha, i.item, i.medida, i.descripcion, i.cantidad AS entrada, p.cantidad AS salida, i.cantidad - COALESCE(SUM(p.cantidad), 0) AS stock
        FROM nea_bien i LEFT JOIN 
        pecosa_bienes p
        ON i.id = p.nea_bien_id
        GROUP BY p.updatedAt`
        const stocknea = await db.query(sql)
        res.json(stocknea[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}