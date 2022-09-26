import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../redux/actions'
import s from './Pagination.module.css'

export default function Pagination({  
  handleNumberClick,
  RecipesNumber,
  recipesPerPage
}) {
  const dispatch = useDispatch()
  const currentPage = useSelector((state) => state.currentPage)
  const pagesNumber = Math.ceil(RecipesNumber) - 1

  const handleFirst = () => {
    dispatch(setCurrentPage(0))
  }
  const handleLast = () => {
    dispatch(setCurrentPage(pagesNumber * recipesPerPage))
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      return dispatch(setCurrentPage(currentPage - recipesPerPage))
    }
    return
  }
  const handleNext = () => {
    if (currentPage < pagesNumber * 9) {
      return dispatch(setCurrentPage(currentPage + recipesPerPage))
    }
    return
  }

  const pages = Array(pagesNumber + 1).fill(0)
  return (
    <div className={s.container}>
      <button className={s.buttonNormal} onClick={handleFirst}>
        {'<<'}
      </button>
      <button className={s.buttonNormal} onClick={handlePrev}>
        {'<'}
      </button>
      {pages.map((n, i) => (
        <button
          className={currentPage / recipesPerPage === i ? s.active : s.buttonNormal}
          onClick={() => handleNumberClick(i)}
          key={i}
        >
          {i + 1}
        </button>
      ))}
      <button className={s.buttonNormal} onClick={handleNext}>
        {'>'}
      </button>
      <button className={s.buttonNormal} onClick={handleLast}>
        {'>>'}
      </button>
    </div>
  )
}
