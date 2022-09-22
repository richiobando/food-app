const { Router } = require('express')
const recipesRouter = require('./recipes.js')
const dietsRouter = require('./diets.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router()

router.use('/recipes', recipesRouter)
router.use('/diets', dietsRouter)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router
