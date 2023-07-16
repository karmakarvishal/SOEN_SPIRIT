const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('attachments', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    original_file_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    uploaded_file_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    uploaded_path: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    mime: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    extension: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    uploaded_by_user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'attachments',
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
