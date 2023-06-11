import { Sequelize } from "sequelize";
/*import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    DB_PORT
  } from '../config/config.js'
  */
const db = new Sequelize(process.env.DB_NAME || 'almacen',process.env.DB_USER || 'root', process.env.DB_PASSWORD || '',{
    host: process.env.DB_HOST || 'localhost',
    port:  process.env.DB_PORT,
    dialect: 'mysql'
})

export default db;