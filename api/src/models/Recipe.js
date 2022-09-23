const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'recipe',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      steps: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
      },
      healthScore: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: 'https://cutt.ly/oVxg2rd',
      },
      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  )
}
