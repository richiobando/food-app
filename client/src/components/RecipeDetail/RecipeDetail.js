import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getRecipeId } from '../../redux/actions'
import Loading from '../Loading/Loading'
import './RecipeDetail.css'

export default function RecipeDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  // const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(getRecipeId(id))
  }, [dispatch, id])
  const recipeDetail = useSelector((state) => state.recipeDetail)

  return Object.keys(recipeDetail) < 1 ? (
    <Loading />
  ) : (
    <div className='detailBody'>
      <div className='recipeDetail'>
        <div className='recipeDetail-container'>
          <h1>{recipeDetail.title}</h1>
          <img src={recipeDetail.image} alt={recipeDetail.title} />
          <p
            className='summary'
            dangerouslySetInnerHTML={{ __html: recipeDetail.summary }}
          />
          <ul>
            {recipeDetail.steps !== undefined
              ? recipeDetail.steps?.map((r) => <li key={r}>{r}</li>)
              : []}
          </ul>
          <small>{recipeDetail.healthScore}</small>
          <p>{recipeDetail.dishTypes}</p>
          <p>
            {recipeDetail.diets?.map((d, i) => (
              <b key={i}>{d}</b>
            ))}
          </p>
        </div>
      </div>
      <button className='button' onClick={() => history.goBack()}>
        BACK
      </button>
    </div>
  )
}
