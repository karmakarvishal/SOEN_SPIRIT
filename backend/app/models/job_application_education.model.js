const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job_application_educations', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    job_application_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    school_or_university: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    degree: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    field_of_study: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    GPA: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    from_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    to_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'job_application_educations',
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
