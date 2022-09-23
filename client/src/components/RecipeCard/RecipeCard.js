import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteRecipe } from '../../redux/actions'

import s from './RecipeCard.module.css'

export default function RecipeCard(props) {
  const dispatch = useDispatch()
  const handleDelete = (id) => {
    return dispatch(deleteRecipe(id))
  }

  return props?.created ? (
    <div className={s.container}>
        <button onClick={() => handleDelete(props.id)}>x</button>
      <Link  to={`recipes/${props.id}`}>
        <div className={s.imgContainer}>
          <img src={props?.image} alt={props?.name} />
        </div>
        <h3>{props?.name}</h3>
        <div className={s.dietsContainer}>
          {props?.diet.map((d, i) => (
            <p className={s.dietTag} key={d.name + i}>
              {d.name}
            </p>
          ))}
        </div>
        <p>{[props?.healthScore]} healthy</p>
      </Link>
    </div>
  ) : (
    <div>
      <Link className={s.container} to={`recipes/${props.id}`}>
        <div className={s.imgContainer}>
          <img src={props?.image} alt={props?.name} />
        </div>
        <h3>{props?.name}</h3>
        <div className={s.dietsContainer}>
          {props?.diet.map((d, i) => (
            <p className={s.dietTag} key={d + i}>
              {d}
            </p>
          ))}
        </div>
        <p>{[props?.healthScore]} healthy</p>
      </Link>
    </div>
  )
}
