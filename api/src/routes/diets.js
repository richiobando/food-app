const { Router } = require('express')
const { Recipe, Diet } = require('../db')
const axios = require('axios')
const { API_KEY } = process.env

const spoonDiets = [
  'Gluten Free',
  'Ketogenic',
  'Vegetarian',
  'Lacto-Vegetarian',
  'Ovo-Vegetarian',
  'Vegan',
  'Pescetarian',
  'Paleo',
  'Primal',
  'Low FODMAP',
  'Whole30',
]
const router = Router()

router.get('/', async (req, res) => {
  try {
    const data = await Diet.findAll()
    if (data.length > 0) {
      return res.json(data)
    } else {
      await Diet.bulkCreate(
        spoonDiets.map((spoonDiet) => {
          return {
            name: spoonDiet,
          }
        })
      )

      const diets = await Diet.findAll()
      return res.json(diets)
    }
  } catch (error) {
    console.log('dataError: ', e)
    res.status(404).send(e)
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  Diet.destroy({ where: { id } })
    .then((data) => res.send(data))
    .catch((e) => res.status(400).json(e))
})

module.exports = router
