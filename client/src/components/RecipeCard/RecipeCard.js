import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteRecipe } from '../../redux/actions'

import s from './RecipeCard.module.css'

export default function RecipeCard(props) {
  return (
    <Link className={s.container} to={`recipes/${props.id}`}>
      <h3>{props?.name}</h3>
      <div className={s.imgContainer}>
        <img src={props?.image} alt={props?.name} />
      </div>
      <div className={s.dietsContainer}>
        {props?.created
          ? props?.diet.map((d, i) => (
              <p className={s.dietTag} key={d.name + i}>
                {d.name}
              </p>
            ))
          : props?.diet.map((d, i) => (
              <p className={s.dietTag} key={d + i}>
                {d}
              </p>
            ))}
      </div>
      <p>{[props?.healthScore]} healthy</p>
    </Link>
  )
}
