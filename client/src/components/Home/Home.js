import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Home.css'

import Nav from '../Nav/Nav'
import RecipeCard from '../RecipeCard/RecipeCard'
import Pagination from '../Pagination/Pagination'
import Footer from '../Footer/Footer'
import { getAllRecipes } from '../../redux/actions'

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

  useEffect(() => {
    dispatch(getAllRecipes())
  }, [dispatch])

  const handleNumberClick = (pageNumber) =>
    setCurrentPage(pageNumber * recipesPerPage)

  return (
    <div className='home-container'>
      <Nav class='navbar' setOrder={setOrder} />
      <div className='body-container'>
        <div className='cards-container'>
          {recipes?.map((r) => (
            <div key={r.id}>
              <RecipeCard
                id={r.id}
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
        </div>
      </div>

      <Footer />
    </div>
  )
}
