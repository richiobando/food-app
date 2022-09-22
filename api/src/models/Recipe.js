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
	defaultValue:'https://you.com/proxy?url=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.kpBaxa4s7jsRuU9A0CorKwHaHa%26w%3D690%26c%3D7%26pid%3DApi%26p%3D0'
      },
    },
    { timestamps: false }
  )
}
