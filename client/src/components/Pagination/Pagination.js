import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../redux/actions'
import s from './Pagination.module.css'

export default function Pagination({  
  handleNumberClick,
  RecipesNumber,
}) {
  const dispatch = useDispatch()
  const currentPage = useSelector((state) => state.currentPage)
  const pagesNumber = Math.ceil(RecipesNumber) - 1

  const handleFirst = () => {
    setCurrentPage(0)
  }
  const handleLast = () => {
    dispatch(setCurrentPage(pagesNumber * 9))
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      return dispatch(setCurrentPage(currentPage - 9))
    }
    return
  }
  const handleNext = () => {
    if (currentPage < pagesNumber * 9) {
      return dispatch(setCurrentPage(currentPage + 9))
    }
    return
  }

  const pages = Array(pagesNumber + 1).fill(0)
  return (
    <div className={s.container}>
      <button className='button' onClick={handleFirst}>
        {'<<'}
      </button>
      <button className='button' onClick={handlePrev}>
        {'<'}
      </button>
      {pages.map((n, i) => (
        <button
          className={currentPage / 9 === i ? s.active : s.buttonNormal}
          onClick={() => handleNumberClick(i)}
          key={i}
        >
          {i + 1}
        </button>
      ))}
      <button className='button' onClick={handleNext}>
        {'>'}
      </button>
      <button className='button' onClick={handleLast}>
        {'>>'}
      </button>
    </div>
  )
}
