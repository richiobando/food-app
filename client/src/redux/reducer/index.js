import {
  GET_ALL_RECIPES,
  GET_RECIPE_ID,
  GET_DIETS,
  GET_RECIPE_NAME,
  ORDER_RECIPE,
  ORDER_HEALTHSCORE,
  CREATE_RECIPE,
  DELETE_RECIPE,
  FILTER_BY_DIET,
  CLEAN_PAGE,
  CURRENT_PAGE,
} from '../actions'
// import actions from '../actions'

const initialState = {
  recipes: [],
  recipesModified: [],
  recipeDetail: {},
  diets: [],
  currentPage: 0,
  hasFilter: false
}
// level 3
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      if (state.hasFilter) {
        return {
          ...state
        }
      }
      return {
        ...state,
        recipes: action.payload,
        recipesModified: action.payload,
      }
    case GET_RECIPE_ID:
      return {
        ...state,
        recipeDetail: action.payload,
      }
    case GET_RECIPE_NAME:
      return {
        ...state,
        recipes: action.payload,
        recipesModified: action.payload,
      }

    case FILTER_BY_DIET:

      const originalRecipes = [...state.recipes]
      const recipesFilter = originalRecipes.filter((r) =>
        r.diets.includes(action.payload)
      )
      return recipesFilter.length === 0
        ? {
            ...state,
            recipesModified: [{error:'Not Found'}],
          }
        : {
          ...state,
          hasFilter: true,
          recipesModified:
              action.payload === 'diets' ? originalRecipes : recipesFilter,
          }
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      }
    case ORDER_RECIPE:
      const values = [...state.recipesModified]
      values.length !== 0 &&
        values.sort((a, b) => {
          return (
            (action.payload === 'A-Z' &&
              ((a.title.toUpperCase() > b.title.toUpperCase() && 1) ||
                (a.title.toUpperCase() < b.title.toUpperCase() && -1))) ||
            (action.payload === 'Z-A' &&
              ((b.title.toUpperCase() > a.title.toUpperCase() && 1) ||
                (b.title.toUpperCase() < a.title.toUpperCase() && -1))) ||
            (action.payload === 'L-H' &&
              ((a.healthScore > b.healthScore && 1) ||
                (a.healthScore < b.healthScore && -1))) ||
            (action.payload === 'H-L' &&
              ((b.healthScore > a.healthScore && 1) ||
                (b.healthScore < a.healthScore && -1))) ||
            0
          )
        })
      return {
        ...state,
        hasFilter: true,
        recipesModified: action.payload === 'initial' ? state.recipes : values,
      }
    case ORDER_HEALTHSCORE:
      const valuesOrderHealthScore = [...state.recipesModified]
      valuesOrderHealthScore.sort((a, b) => a.healthScore - b.healthScore)
      return {
        ...state,
        hasFilter: true,
        recipesModified: valuesOrderHealthScore,
      }
    case CREATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.concat(action.payload),
        recipesModified: state.recipes.concat(action.payload),
      }
    case DELETE_RECIPE:
      return {
        ...state,
        recipesModified: state.recipesModified.filter(
          (r) => r.id !== action.payload
        ),
      }
    case CLEAN_PAGE:
      return {
        ...state,
        recipeDetail: {},
      }
    case CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      }

    default:
      return { ...state }
  }
}

export default rootReducer
// idea for refactor
/* const actions = {
  GET_ALL_RECIPES: {...state, recipes: action.payload, recipesModified: action.payload,},
  DELETE_RECIPE: {
    ...state,
    recipesModified: state.recipesModified.filter(
      (r) => r.id !== action.payload
    ),
  }
} 
const rootReducer = (state = initialState, action) => {
  return actions[action.type]
}
 */