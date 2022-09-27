import React, {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams,Link } from 'react-router-dom'
import { getRecipeId, cleanPage, deleteRecipe } from '../../redux/actions'
import Loading from '../Loading/Loading'
import './RecipeDetail.css'

export default function RecipeDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleDelete = (id) => {
    dispatch(deleteRecipe(id))
    history.goBack()
  }
  
  useEffect(() => {
    dispatch(getRecipeId(id))
    return () => dispatch(cleanPage())
  }, [dispatch, id])
  const recipeDetail = useSelector((state) => state.recipeDetail)
  return Object.keys(recipeDetail) < 1 ? (
    <Loading />
  ) : (
    <div className='detailBody'>
      <div className='recipeDetail'>
        <div className='recipeDetail-title'>
            <h1>{recipeDetail.title}</h1>
            {
              false? (<> 
              <Link
                to={`/update/${recipeDetail.id}`}
                className='buttonDelete'
              >
                Edit
              </Link>
          </>
          ) : (
              <button
                className='buttonDelete'
                onClick={() => handleDelete(recipeDetail.id)}
              >
                Delete
              </button>
          )}
        </div>
        <div className='recipeDetail-container'>
          <div>
            <img
              className='imageDetail'
              src={recipeDetail.image}
              alt={recipeDetail.title}
            />
          </div>
          <div className='recipeDetail-content'>
            <p
              className='summary'
              dangerouslySetInnerHTML={{ __html: recipeDetail.summary }}
            />
            <ol>
              {recipeDetail.steps !== undefined
                ? recipeDetail.steps?.map((r) => <li key={r}>{r}</li>)
                : []}
            </ol>
            <p>Health Score: {recipeDetail.healthScore}</p>
            <div>
              <h3>Dish Types</h3>
              {recipeDetail.dishTypes?.map((t, i) => (
                <p key={i} className='tag type'>
                  {t}
                </p>
              ))}
            </div>
            <h3>Diets</h3>
            <div className='diets-container'>
              {recipeDetail.diets?.map((d, i) => (
                <p className='tag diet' key={i}>
                  {d}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button
        className='button'
        onClick={() => {
          history.goBack()
        }}
      >
        BACK
        </button>
        
    </div>
  )
}
