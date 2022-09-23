const { Router } = require('express')
const { Recipe, Diet } = require('../db')

const { API_KEY } = process.env
const {
  getById,
  getDbInfo,
  getApiData,
  recipeDataJoined,
} = require('../controllers/recipes')

const router = Router()

router.get('/', async (req, res) => {
  const { name } = req.query
  
  try {
    const allRecipes = await recipeDataJoined()

    if (!name) return res.send(allRecipes)

    let flirtedRecipes = allRecipes.filter((r) =>
      r.title.toLowerCase().includes(name.toLowerCase())
    )

    return res.json(flirtedRecipes)
  } catch (e) {
    console.error(e)
    return res.status(404).json(e)
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const recipeById = await getById(id)
  res.json(recipeById)
})

router.post('/', async (req, res) => {
  try {
    const { title, summary, healthScore, steps, diets } = req.body

    const newRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      steps,
    })
    const allDiets = await Diet.findAll({ where: { name: diets } })
    console.log('allDiets', allDiets)
    newRecipe.addDiet(allDiets)
    res.json(newRecipe)
  } catch (error) {
    console.error(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deletedRecipe = await Recipe.destroy({ where: { id } })
    res.send(`recipe deletes id: ${id}`)
    res.send(deletedRecipe)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
