import db from '../database/db.js';
import { Sequelize } from "sequelize";
import ModelsAdministrativos from './Models.js';
import ModelsSedes from './ModelsSedes.js';
import ModelsMetas from './ModelsMetas.js';
import ModelsInvenInicial from './ModelsInvenInicial.js';

const { DataTypes } = Sequelize;
const ModelsPecosaPedidos = db.define('pecosa_pedidos', {

    dependencias: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_administrativos: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_administrativo2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_de_sede: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,

    },
    id_metas: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    almacen: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    oficio: {
        type: DataTypes.STRING,
        allowNull: true,
    }
    

}, { freezeTableName: true});

ModelsInvenInicial.belongsToMany(ModelsPecosaPedidos, { through:"pecosa_bienes" });
ModelsPecosaPedidos.belongsToMany(ModelsInvenInicial, { through:"pecosa_bienes" });


ModelsPecosaPedidos.belongsTo(ModelsAdministrativos, { foreignKey: "id_administrativos" })
ModelsAdministrativos.hasOne(ModelsPecosaPedidos, {
    foreignKey: {
        name: 'id',
    }
})

{/*
ModelsPecosaPedidos.belongsTo(ModelsSedes, { foreignKey: "id_sedes"})
ModelsSedes.hasOne(ModelsPecosaPedidos,{
    foreignKey: {
        name: 'id',
    }
})
*/}


ModelsPecosaPedidos.belongsTo(ModelsMetas, { foreignKey: "id_metas" })
ModelsMetas.hasOne(ModelsPecosaPedidos, {
    foreignKey: {
        name: 'id',
    }
})


export default ModelsPecosaPedidos