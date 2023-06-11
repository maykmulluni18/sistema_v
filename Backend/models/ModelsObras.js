import db from '../database/db.js';
import { Sequelize } from "sequelize";
const { DataTypes } = Sequelize;
const ModelsObras = db.define('obras', {
    obras: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
}, {
    freezeTableName: true
});


export default ModelsObras