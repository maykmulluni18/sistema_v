'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sedes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sedes.init({
    cuenta_de_costo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    sede: DataTypes.STRING,
    responsable: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sedes',
  });
  return sedes;
};