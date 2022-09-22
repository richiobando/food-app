import React from 'react'
import s from './Pagination.module.css'
export default function Pagination({
  currentPage,
  setCurrentPage,
  handleNumberClick,
  RecipesNumber,
}) {
  const pagesNumber = Math.ceil(RecipesNumber)
  const handleFirst = () => {
    setCurrentPage(0)
  }
  const handleLast = () => {
    setCurrentPage(pagesNumber)
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }
  const handleNext = () => {
    if (currentPage !== pagesNumber) {
      setCurrentPage(currentPage + 1)
    }
  }

  const pages = Array(pagesNumber).fill(1)
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
          className='button'
          value='f'
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
