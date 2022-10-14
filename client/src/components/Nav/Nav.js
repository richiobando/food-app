import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getDiets,
  getRecipeName,
  orderRecipesBy,
  filterByDiet,
  setCurrentPage,
} from '../../redux/actions'
import './Nav.css'
import searchIcon from '../../img/search-icon.png'
import logo from '../../img/logo-main.png'

export default function Nav({ setOrder }) {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [active, setActive] = useState(false)
  const [filter, setFilter] = useState({
    order: '',
    diets: '',
  })

  const diets = useSelector((state) => state.diets)
  useEffect(() => {
    dispatch(getDiets())
  }, [dispatch])

  const handleSearch = (e) => {
    e.preventDefault()

    dispatch(getRecipeName(search))
    dispatch(orderRecipesBy(filter.order)) 
    dispatch(filterByDiet(filter.diets))
    
    setOrder('')
    dispatch(setCurrentPage(0))
    setSearch('')
  }
  const handleInputChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }
  const handleOrder = (val) => {
    setFilter({...filter, order:val})
    dispatch(orderRecipesBy(val))
    setOrder('')
  }
  const handleChosenDiet = (val) => {
    dispatch(setCurrentPage(0))
    setFilter({...filter, diets:val.toLowerCase()})
    dispatch(filterByDiet(val.toLowerCase()))
  }
  return (
    <nav>
      <Link
        className='button logo'
        to={'/home'}
        onClick={(e) => setOrder('reset')}
      >
        <img src={logo} alt='logo' />
      </Link>
      <Link className='button' to={'/create'}>
        Create Recipe
      </Link>

      {/* Alphabetical order */}
      <select className='button' onChange={(e) => handleOrder(e.target.value)}>
        <option value='initial'>Order</option>
        <option value='A-Z'>A-Z</option>
        <option value='Z-A'>Z-A</option>
        <option value='L-H'>Low-High Health Score</option>
        <option value='H-L'>High-Low Health Score</option>
      </select>
      <select
        className='button'
        onChange={(e) => handleChosenDiet(e.target.value)}
      >
        <option>diets</option>
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
            <button type='submit' className='button'>
              Search
            </button>
          ) : (
            <img
                src={searchIcon}
                alt='Search icon'
              className={`searchIcon button ${active === true && 'active'}`}
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
