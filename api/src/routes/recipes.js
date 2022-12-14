const { Router } = require('express')
const router = Router()
const { Recipe, Diet } = require('../db')

const { API_KEY } = process.env
const {
  getById,
  recipeDataJoined,
} = require('../controllers/recipes')

router.get('/', async (req, res) => {
  const { name } = req.query
  try {
    const allRecipes = await recipeDataJoined()

    if (!name) return res.send(allRecipes)

    let flirtedRecipes = allRecipes.filter((r) =>
      r.title.toLowerCase().includes(name.toLowerCase())
    )
    if (flirtedRecipes.length === 0) {
      return res.status(404).json({ error: `${name} not found` })
    }
    return res.json(flirtedRecipes)
  } catch (e) {
    console.error(e)
    res.status(404).json(e)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const recipeById = await getById(id)
    res.json(recipeById)
  } catch (e) {
    console.error(e)
    next()
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { title, summary, healthScore, steps, diets } = req.body

    const newRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      steps,
    })
    const allDiets = await Diet.findAll({ where: { name: diets } })
    await newRecipe.addDiet(allDiets)

    res.json(newRecipe)
  } catch (e) {
    console.error(e)
    next()
  }
})

router.put('/', async (req, res,next) => {
  const { id, title, summary, healthScore, steps,diets } = req.body
  if (!id || !title || !summary) {
    return res
      .status(400)
      .json({ error: 'the necessary parameters were not received' })
  }
  try {
	await Recipe.update({
      title,
      summary,
      healthScore,
      steps,
    }, { where: { id } })
    const allDiets = await Diet.findAll({ where: { name: diets } })
    const updatedRecipe = await Recipe.findByPk(id)
    await updatedRecipe.setDiets([])
  await updatedRecipe.addDiet(allDiets)
	
    res.json('had been update successfully')
} catch (error) {
	console.error(error)
    next()
}
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await Recipe.destroy({ where: { id } })
    res.send(`id: ${id} deleted successfully`)
  } catch (e) {
    console.error(e)
    next()
  }
})

module.exports = router
