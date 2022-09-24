const axios = require('axios')
const { Recipe, Diet } = require('../db')
const { API_KEY } = process.env
const getApiData = async () => {
  try {
    const response = await axios.get(
      // `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      `https://run.mocky.io/v3/d9ef196d-62a6-4abe-b3ab-b60676c3a4e7`
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
        .get
        // `https://run.mocky.io/v3/bc5e86ae-bfdc-413d-94f6-383e6c86680d`
        () // on recipe
        .get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        )
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

module.exports = {
  getById,
  recipeDataJoined,
  getDbInfo,
  getApiData,
  recipeDataJoined,
}
