import db from '../database/db.js';
import { Sequelize } from "sequelize";
import ModelsPecosaPedidos from "./ModelsPecosaPedidos.js"
import ModelsInvenInicial from "../models/ModelsInvenInicial.js"
import ModelsNeaBien from './ModelsNeaBien.js';
import ModelsBienes from './ModelsBienes.js';

const { DataTypes } = Sequelize;
const ModelsPecosaBienes = db.define('pecosa_bienes', {

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    pecosaPedidoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
    },
    inventaridoInicialId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    nea_bien_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cantidad: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false,
        

    },
    medida: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    observaciones: {
        type: DataTypes.STRING,
        allowNull: false,

    },

    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    }

}, {
    freezeTableName: true
});



ModelsPecosaBienes.belongsTo(ModelsPecosaPedidos, { foreignKey: "pecosaPedidoId" })
ModelsPecosaPedidos.hasOne(ModelsPecosaBienes, {
    foreignKey: {
        name: 'id',
    }
})

ModelsPecosaBienes.belongsTo(ModelsInvenInicial, { foreignKey: "inventaridoInicialId" })
ModelsInvenInicial.hasMany(ModelsPecosaBienes, {
    foreignKey: {
        name: 'id',
    }
})

ModelsPecosaBienes.belongsTo(ModelsNeaBien, {foreignKey: "nea_bien_id"})
ModelsNeaBien.hasOne(ModelsPecosaBienes, {
    foreignKey: {
        name: 'id',
    }
})
ModelsInvenInicial.belongsTo(ModelsBienes, { foreignKey: "idBienes" })
ModelsBienes.hasMany(ModelsInvenInicial, {
    foreignKey: {
        name: 'id',
    }
})
export default ModelsPecosaBienes