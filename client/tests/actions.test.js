import * as data from '../../../full-api-food.json'
// import * as data from "../db.json";
import '@testing-library/jest-dom/extend-expect'

import {
  GET_ALL_RECIPES,
  GET_RECIPE_DETAILS,
  CREATE_RECIPE,
  DELETE_RECIPE,
  getAllRecipes,
  getRecipeDetail,
  createRecipe,
  deleteRecipe,
} from '../src/redux/actions'

// import axios from "axios";
// import configureStore from "redux-mock-store";
// import nock from "nock";
// import nodeFetch from "node-fetch";
// import thunk from "redux-thunk";

// axios.defaults.adapter = require("axios/lib/adapters/http");

test('should dispatch type GET_ALL_RECIPES and payload the fetch of the link',  () => {
  console.log(getAllRecipes())
  // expect(getAllRecipes).toBe({})
})

// describe('Actions', () => {
// const mockStore = configureStore([thunk]);
// const store = mockStore({ recipes: [] });
// global.fetch = nodeFetch;
// beforeEach(() => {
//   store.clearActions();

//   // Se Mockea las request a las api
//   const apiMock = nock("http://localhost:3001").persist();

//   // "/recipes" => Retorna la propiedad movies del archivo data.json
//   apiMock.get("/recipes").reply(200, data.recipes);

//   // "/recipes/:id" => Retorna una recipe matcheado por su id
//   let id = null;
//   apiMock
//     .get((uri) => {
//       id = Number(uri.split("/").pop()); // Number('undefined') => NaN
//       return !!id;
//     })
//     .reply(200, (uri, requestBody) => {
//       return data.recipes.find((recipe) => recipe.id === id) || {};
//     });
// });

// afterEach(() => {
//   nock.cleanAll();
// });

//   describe('getAllRecipe', () => {
//     test('should dispatch type GET_ALL_RECIPES and payload the fetch of the link', async () => {
//       expect(getAllRecipes).toBe({})
//     })
//   })
// })
