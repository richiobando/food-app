const { Router } = require('express')
const { Recipe, Diet } = require('../db')
const axios = require('axios')
const { API_KEY } = process.env

const router = Router()

const getById = async (id) => {
  //search Data base by id
  if (id.length > 15) {
    try {
      const recipeByID = await Recipe.findByPk(id, {
        include: {
          include: {
            model: Diet,
            attributes: ['name'],
          },
        },
      })
      return {
        id: recipeByID.id,
        title: recipeByID.title,
        summary: recipeByID.summary,
        healthScore: recipeByID.healthScore,
        diets: recipeByID.diets,
        image: recipeByID.image,
        steps: recipeByID.steps,
      }
    } catch (error) {
      console.error(error)
    }
  } else {
    // search api by id
    try {
      const response = await axios
        .get(`https://run.mocky.io/v3/bc5e86ae-bfdc-413d-94f6-383e6c86680d`) // on recipe
        // .get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
      const data = response.data
      return {
        id: data.id,
        title: data.title,
        summary: data.summary,
        healthScore: data.healthScore,
        diets: data.diets,
        image: data.image,
        dishTypes: data.dishTypes,
        steps:
          data.analyzedInstructions.steps !== undefined
            ? data.analyzedInstructions.steps.map((s) => {
                return {
                  number: s.number,
                  step: s.step,
                }
              })
            : [],
      }
    } catch (error) {
      console.error(error)
    }
  }
  //end api
}
const getApiData = async () => {
  try {
    const response = await axios.get(
      // `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
    )
    return response.data.results.map((data) => {
      return {
        id: data.id,
        title: data.title,
        summary: data.summary,
        healthScore: data.healthScore,
        diets: data.diets,
        image: data.image,
        steps: data.analyzedInstructions[0]?.steps.map((s) => {
          return {
            number: s.number,
            step: s.step,
          }
        }),
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: { model: Diet, attributes: ['name'] },
  })
}

const recipeDataJoined = async (id) => {
  let recipeDbData = await getDbInfo()
  let recipeApiData = await getApiData()
  return recipeDbData.concat(recipeApiData)
}

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
    const allDiets = await Diet.findAll({ where: { name: diets[0] } })

    newRecipe.addDiets(allDiets)
    res.json(newRecipe)
  } catch (error) {
    console.error(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deletedRecipe = await Recipe.destroy({ where: { id } })
    res.send(deletedRecipe)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
