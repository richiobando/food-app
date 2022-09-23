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
