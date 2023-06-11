import ModelsBienes from './ModelsBienes.js';
import db from '../database/db.js';
import { Sequelize } from "sequelize";
const { DataTypes } = Sequelize;
const ModelsInvenInicial = db.define('inventarido_inicial', {
    idBienes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    cuenta:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad_inicial: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false,
    },
    precio: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false,
    },
    fecha_registro: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    freezeTableName: true
});



export default ModelsInvenInicial

