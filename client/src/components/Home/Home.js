import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Home.css'

import Nav from '../Nav/Nav'
import RecipeCard from '../RecipeCard/RecipeCard'
import Pagination from '../Pagination/Pagination'
import Footer from '../Footer/Footer'
import { getAllRecipes,getCurrentPage } from '../../redux/actions'
import Loading from '../Loading/Loading'

export default function Home() {
  const dispatch = useDispatch()
  const receivedStateRecipes = useSelector((state) => state.recipesModified)

  const [, setOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  const recipesPerPage = 9
  const recipes = receivedStateRecipes?.slice(
    currentPage,
    currentPage + recipesPerPage
  )
console.log('recipes',recipes)
  useEffect(() => {
    dispatch(getAllRecipes())
  }, [dispatch])

  const handleNumberClick = (pageNumber) => {
    console.log('pageNumber',pageNumber)
    setCurrentPage(pageNumber * recipesPerPage)}

  return (
    <div className='home-container'>
      <Nav class='navbar' setOrder={setOrder} setCurrentPage={setCurrentPage}/>
      <div>
        {Object.keys(recipes).length < 1  ? <Loading/>:<div className='cards-container'>
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
              RecipesNumber={receivedStateRecipes.length / recipesPerPage}
            />
          </div>
        </div>}
      </div>
      <Footer />
    </div>
  )
}
