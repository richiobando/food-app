/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai')
const session = require('supertest-session')
const app = require('../../src/app.js')
const { Recipe, conn } = require('../../src/db.js')

const agent = session(app)
const firstRecipe = {
  id: 716426,
  title: 'Cauliflower, Brown Rice, and Vegetable Fried Rice',
  summary:
    'Cauliflower, Brown Rice, and Vegetable Fried Rice might be a good recipe to expand your side dish recipe box. Watching your figure? This gluten free, dairy free, lacto ovo vegetarian, and vegan recipe has <b>192 calories</b>, <b>7g of protein</b>, and <b>6g of fat</b> per serving. For <b>$1.12 per serving</b>, this recipe <b>covers 19%</b> of your daily requirements of vitamins and minerals. This recipe serves 8. This recipe from fullbellysisters.blogspot.com has 3689 fans. This recipe is typical of Chinese cuisine. From preparation to the plate, this recipe takes about <b>30 minutes</b>. Head to the store and pick up peas, broccoli, salt, and a few other things to make it today. Overall, this recipe earns an <b>awesome spoonacular score of 100%</b>. Users who liked this recipe also liked <a href="https://spoonacular.com/recipes/vegetable-fried-brown-rice-36199">Vegetable Fried Brown Rice</a>, <a href="https://spoonacular.com/recipes/vegetable-fried-cauliflower-rice-933261">Vegetable Fried Cauliflower Rice</a>, and <a href="https://spoonacular.com/recipes/easy-vegetable-fried-brown-rice-with-egg-802042">Easy Vegetable Fried Brown Rice with Egg</a>.',
  healthScore: 76,
  diets: ['gluten free', 'dairy free', 'lacto ovo vegetarian', 'vegan'],
  steps: [
    {
      number: 1,
      step: 'Remove the cauliflower\'s tough stem and reserve for another use. Using a food processor, pulse cauliflower florets until they resemble rice or couscous. You should end up with around four cups of "cauliflower rice."',
    },
    {
      number: 2,
      step: 'Heat 1T butter and 1T oil in a large skillet over medium heat.',
    },
    {
      number: 3,
      step: 'Add garlic and the white and light green pieces of scallion. Sauté about a minute.',
    },
    {
      number: 4,
      step: 'Add the cauliflower to the pan. Stir to coat with oil, then spread out in pan and let sit; you want it cook a bit and to caramelize (get a bit brown), which will bring out the sweetness. After a couple of minutes, stir and spread out again.',
    },
    {
      number: 5,
      step: "Add cold rice (it separates easily, so it won't clump up during cooking), plus the additional grapeseed and coconut oil or butter. Raise heat to medium-high. Toss everything together and, again, spread the mixture out over the whole pan and press a bit into the bottom.",
    },
    {
      number: 6,
      step: 'Let it sit for about two minutes—so the rice can get toasted and a little crispy.',
    },
    {
      number: 7,
      step: 'Add the peas and broccoli and stir again.',
    },
    {
      number: 8,
      step: 'Drizzle soy sauce and toasted sesame oil over rice.Cook for another minute or so and turn off heat.',
    },
    {
      number: 9,
      step: "Add chopped scallion tops and toss.I like to toast some sesame seeds in a dry pan; I sprinkle these and some more raw, chopped scallion over the top of the rice for added flavor and crunch.Season to taste with salt and, if you'd like, more soy sauce. Keep in mind that if you're serving this with something salty and saucy (ie. teriyaki chicken) you may want to hold off on adding too much salt to the fried rice.",
    },
  ],
}

const idRecipe = {
  title: 'Homemade Garlic and Basil French Fries',
  summary:
    'The recipe Homemade Garlic and Basil French Fries is ready <b>in roughly 45 minutes</b> and is definitely a super <b>vegan</b> option for lovers of American food. One serving contains <b>596 calories</b>, <b>18g of protein</b>, and <b>15g of fat</b>. For <b>83 cents per serving</b>, you get a side dish that serves 2. Several people made this recipe, and 1669 would say it hit the spot. If you have garlic salt, flour, garlic powder, and a few other ingredients on hand, you can make it. All things considered, we decided this recipe <b>deserves a spoonacular score of 100%</b>. This score is outstanding. Try <a href="https://spoonacular.com/recipes/homemade-french-fries-with-fresh-garlic-and-dill-494220">Homemade French Fries with Fresh Garlic and Dill</a>, <a href="https://spoonacular.com/recipes/roasted-garlic-french-fries-519898">Roasted Garlic French Fries</a>, and <a href="https://spoonacular.com/recipes/sweet-potato-fries-with-basil-salt-and-garlic-mayonnaise-120735">Sweet Potato Fries With Basil Salt and Garlic Mayonnaise</a> for similar recipes.',
  healthScore: 77,
  diets: ['dairy free', 'lacto ovo vegetarian', 'vegan'],
  image: 'https://spoonacular.com/recipeImages/715594-556x370.jpg',
}
const recipe = {
  title: 'Gallo Pinto',
  summary: 'arroz con frijoles ',
  steps: [],
  healthScore: 100,
}

describe('Recipe routes', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err)
    })
  )
  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
  )
  describe('GET /recipes', () => {
    it('should return name recipe', async () => {
      agent
        .get('/recipes?name=Cauliflower, Brown Rice, and Vegetable Fried Rice')
        .expect([firstRecipe])
    })
  })
  describe('GET /recipes/:id', () => {
    it('should return one recipe', async () => {
      agent.get('/recipes/715594').expect(idRecipe)
    })
  })
})
