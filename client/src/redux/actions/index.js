import axios from 'axios'
import { db } from '../../../src/full-api-food'

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES'
export const GET_RECIPE_ID = 'GET_RECIPE_ID'
export const GET_RECIPE_NAME = 'GET_RECIPE_NAME'
export const ORDER_RECIPE = 'ORDER_RECIPE'
export const GET_DIETS = 'GET_DIETS'
export const ORDER_HEALTHSCORE = 'ORDER_HEALTHSCORE'
export const CREATE_RECIPE = 'CREATE_RECIPE'
export const FILTER_BY_DIET = 'FILTER_BY_DIET'
export const DELETE_RECIPE = 'DELETE_RECIPE'
export const CLEAN_PAGE = 'CLEAN_PAGE'
export const CURRENT_PAGE = 'CURRENT_PAGE'

export const getAllRecipes = () => {
  return async (dispatch) => {
    try {
      // const data = db.results
      // return dispatch({ type: GET_ALL_RECIPES, payload: data })

      const data = await axios.get('/recipes')
      return dispatch({ type: GET_ALL_RECIPES, payload: data.data })
    } catch (error) {
      console.error(error)
    }
  }
}
export const getRecipeId = (id) => {
  return async (dispatch) => {
    try {
      const data = await axios.get(`/recipes/${id}`)
      return dispatch({ type: GET_RECIPE_ID, payload: data.data })
    } catch (error) {
      
      alert(error)
    }
  }
}
export const getDiets = (data) => {
  return async (dispatch) => {
    try {
	const data = await axios.get(`/diets`)
	    return dispatch({ type: GET_DIETS, payload: data.data })
} catch (error) {
	alert(error)
}
  }
}
export const getRecipeName = (name) => {
  return async (dispatch) => {
    try {
      const data = await axios(`/recipes?name=${name}`)
      return dispatch({ type: GET_RECIPE_NAME, payload: data.data })
    } catch (error) {
      alert(error)
    }
  }
}

export const orderRecipesBy = (data) => {
  return (dispatch) => {
    return dispatch({ type: ORDER_RECIPE, payload: data })
  }
}
export const createRecipe = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/recipes', data)
      return dispatch({ type: CREATE_RECIPE, payload: response.data })
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteRecipe = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/recipes/${id}`)
      return dispatch({ type: DELETE_RECIPE, payload: id })
    } catch (error) {
      console.error(error)
    }
  }
}

export const filterByDiet = (diet) => {
  return (dispatch) => {
    return dispatch({ type: FILTER_BY_DIET, payload: diet })
  }
}

export const orderByHealthScore = (data) => {
  return (dispatch) => {
    return dispatch({ type: ORDER_HEALTHSCORE, payload: data })
  }
}
export const cleanPage = (data) => {
  return (dispatch) => {
    return dispatch({ type: CLEAN_PAGE, payload: data })
  }
}
export const setCurrentPage = (page) => {
  return (dispatch) => {
    return dispatch({ type: CURRENT_PAGE, payload: page })
  }
}
