import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Home.css'

import Nav from '../Nav/Nav'
import RecipeCard from '../RecipeCard/RecipeCard'
import Pagination from '../Pagination/Pagination'
import Footer from '../Footer/Footer'
import { getAllRecipes,orderRecipesBy,setCurrentPage } from '../../redux/actions'
import Loading from '../Loading/Loading'

export default function Home() {
  const dispatch = useDispatch()
  let receivedStateRecipes = useSelector((state) => state.recipesModified)
  const currentPage = useSelector((state) => state.currentPage)
  console.log('recipes',receivedStateRecipes.map(e=>e.diets))

  const [order, setOrder] = useState('')

  const recipesPerPage = 9
  let recipes = receivedStateRecipes?.slice(
    currentPage,
    currentPage + recipesPerPage
  )
  useEffect(() => {
    dispatch(getAllRecipes())
  }, [dispatch])

  useEffect(() => {
    if (order === 'reset') {
      dispatch(getAllRecipes())
      dispatch(orderRecipesBy('initial'))
      dispatch(setCurrentPage(0))
    }
  }, [order]);
  
  const handleNumberClick = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber * recipesPerPage))
  }

  return (
    <div className='home-container'>
      <Nav class='navbar' setOrder={setOrder} />
      <div>
        {recipes === 'Not Found' ? <button className='button'  type='reset'onClick={() => setOrder('reset') }>Not Found</button>:
        Object.keys(recipes).length < 1  ? <Loading/>:<div className='cards-container'>
          {recipes?.map((r) => (
            <div key={r.id}>
              <RecipeCard
                id={r.id}
                created={r.created}
                image={r.image}
                name={r.title}
                diet={r.diets}
                healthScore={r.healthScore}
              />
            </div>
          ))}
          <div className='pagination'>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handleNumberClick={handleNumberClick}
              recipesPerPage={recipesPerPage}
              RecipesNumber={receivedStateRecipes.length / recipesPerPage}
            />
          </div>
        </div>}
      </div>
      <Footer />
    </div>
  )
}
