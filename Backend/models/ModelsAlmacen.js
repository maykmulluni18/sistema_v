import db from '../database/db.js';
import { Sequelize } from "sequelize";
const { DataTypes } = Sequelize;
const ModelsAlmacen = db.define('almacen', {
    almacen: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
}, {
    freezeTableName: true
});


export default ModelsAlmacen