import db from '../database/db.js';
import Metas from './ModelsMetas.js';
import { Sequelize } from "sequelize";
const { DataTypes } = Sequelize;
const Models = db.define('usuarios',{
    apellido_paterno:{
        type: DataTypes.STRING
    },
    apellido_materno:{
        type: DataTypes.STRING
    },
    nombres:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true,
});
export default Models;
/*const Models = db.define('usuario_admin',{
    nombre_usuario:{type: DataTypes.STRING},
    email:{type: DataTypes.STRING},
    password:{type: DataTypes.STRING},
})*/

Metas.belongsTo(Models, { foreignKey: "id_residente" })
Metas.hasOne(Models, {
    foreignKey: {
        name: 'id',
    }
})

Metas.belongsTo(Models, { foreignKey: "id_almacenario" })
Metas.hasOne(Models, {
    foreignKey: {
        name: 'id',
    }
})

Metas.belongsTo(Models, { foreignKey: "id_asistente_adm" })
Metas.hasOne(Models, {
    foreignKey: {
        name: 'id',
    }
})
