import db from '../database/db.js';
import { Sequelize } from "sequelize";
const {DataTypes} = Sequelize;

const Metas = db.define('Metas',{
    meta_1:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    meta_2:{
        type: DataTypes.STRING,
        allowNull: true,
       
    },
    obra:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_residente:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_almacenario:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_asistente_adm:{
        type: DataTypes.INTEGER,
        allowNull: true,

    }
   
},{
    freezeTableName: true
});



export default Metas