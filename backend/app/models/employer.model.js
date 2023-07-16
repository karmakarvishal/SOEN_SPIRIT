const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    company_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    company_address_line1: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    company_city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    company_province: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    company_postal_code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    company_phone: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'employers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
