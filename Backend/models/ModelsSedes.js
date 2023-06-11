import db from '../database/db.js';
import { Sequelize } from "sequelize";
const {DataTypes} = Sequelize;

const ModelsSedes = db.define('sedes',{

    cuenta_de_costo:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    sede:{
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    responsable:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    freezeTableName: true
});

export default ModelsSedes