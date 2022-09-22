import React from 'react'
import { Link } from 'react-router-dom'

import s from './RecipeCard.module.css'

export default function RecipeCard(props) {
  // const handleDelete = (e) => {
  //   return
  // }
  // const isCreated = true

  return (
    <div>
      <Link className={s.container} to={`recipes/${props.id}`}>
        {/* {isCreated ? <button onClick={handleDelete}>x</button> : null} */}

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
