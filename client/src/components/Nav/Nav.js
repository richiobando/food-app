import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getDiets,
  getRecipeName,
  orderRecipesBy,
  filterByDiet,
  getCurrentPage,
} from '../../redux/actions'
import './Nav.css'
import searchIcon from '../../img/search-icon.png'
import logo from '../../img/logo-main.png'

export default function Nav({ setOrder, setCurrentPage }) {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [active, setActive] = useState(false)

  const diets = useSelector((state) => state.diets)

  useEffect(() => {
    dispatch(getDiets())
  }, [dispatch])

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(getRecipeName(search))
    setOrder(e.target.value)
    dispatch(getCurrentPage(0))
    setCurrentPage(0)
    setSearch('')
  }
  const handleInputChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const handleOrder = (e) => {
    dispatch(orderRecipesBy(e.target.value))
    setOrder(e.target.value)
  }
  const handleChosenDiet = (e) => {
    dispatch(filterByDiet(e.target.value.toLowerCase()))
  }
  return (
    <nav>
      <Link className='button logo' to={'/home'} onClick={() => setCurrentPage(0)}>
        <img src={logo} alt="logo" />
      </Link>
      <Link className='button' to={'/create'}>
        Create Recipe
      </Link>

      {/* Alphabetical order */}
      <select className='button select' onChange={(e) => handleOrder(e)}>
        <option value='initial'>Order</option>
        <option value='A-Z'>A-Z</option>
        <option value='Z-A'>Z-A</option>
        <option value='L-H'>Low-High Health Score</option>
        <option value='H-L'>High-Low Health Score</option>
      </select>
      <select className='button select' onChange={(e) => handleChosenDiet(e)}>
        <option>Diets</option>
        {diets?.map((d, i) => (
          <option key={i}> {d.name}</option>
        ))}
      </select>
      {/* by name search */}
      <ul>
        <form
          className={`navigationForm ${active === true && 'active'}`}
          onSubmit={(e) => handleSearch(e)}
        >
          <input
            className={`text ${active === true && 'active'}`}
            type='text'
            name='search'
            value={search}
            onChange={(e) => handleInputChange(e)}
            placeholder='Search Recipes'
          />
          {active === true ? (
            <div className='button'>search</div>
          ) : (
            <img
              src={searchIcon}
              className={`searchIcon button ${active === true && 'active'}`}
              type='submit'
              onClick={() => setActive(true)}
            />
          )}
          <i
            className={`button cancel ${active === true && 'active'}`}
            onClick={() => setActive(false)}
          >
            x
          </i>
        </form>
      </ul>
    </nav>
  )
}
