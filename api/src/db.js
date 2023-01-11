require('dotenv').config()
const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path')

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME ,DIALECT, DB_PORT } = process.env

let sequelize =
  process.env.NODE_ENV === 'production'
    ? new Sequelize({
        database: DB_NAME,
        dialect: DIALECT,
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, {
        logging: false, // set to console.log to see the raw SQL queries
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed
      })

const basename = path.basename(__filename)

const modelDefiners = []

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)))
  })

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize))
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models)
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
])
sequelize.models = Object.fromEntries(capsEntries)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Recipe, Diet } = sequelize.models

// Aca vendrian las relaciones
Recipe.belongsToMany(Diet, { through: 'RecipeDiet' })
Diet.belongsToMany(Recipe, { through: 'RecipeDiet' })

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
}



/* DB_USER=postgres
DB_PASSWORD=dOITUGUqJe3nQGDIIxGY
DB_HOST=containers-us-west-18.railway.app:7643
API_KEY=de9beddb3aa4489785605813eebc7731
DIALECT=postgresql
DB_NAME=railway 

interna

postgres://psql:e2tcSAau3cDz9jNFzqN9V2KjvVXwfpBS@dpg-cd45ep2en0hstdce4c2g-a/food_2a6x
external 
postgres://psql:e2tcSAau3cDz9jNFzqN9V2KjvVXwfpBS@dpg-cd45ep2en0hstdce4c2g-a.oregon-postgres.render.com/food_2a6x

DB_USER=psql
DB_PASSWORD=e2tcSAau3cDz9jNFzqN9V2KjvVXwfpBS
DB_HOST=dpg-cd45ep2en0hstdce4c2g-a

dpg-cd45ep2en0hstdce4c2g-a.oregon-postgres.render.com

API_KEY=de9beddb3aa4489785605813eebc7731
DIALECT=postgres
DB_NAME=food_2a6x

*/
