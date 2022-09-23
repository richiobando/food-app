import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { getDiets, createRecipe } from '../../redux/actions'
import './CreateRecipe.css'

const initialInputState = {
  // title: 'Gallo Pinto',
  // summary: 'arroz con frijoles en salsa inglesa',
  // steps: [''],
  // // steps: ['Agregue arroz', 'Agregue frijoles', 'Agregue salsa inglesa'],
  // diets: ['Vegan', 'Vegetarian', 'Ovo-Vegetarian'],
  // image: '',

  title: '',
  image: '',
  healthScore: 0,
  summary: '',
  diets: [],
  steps: [''],
  image: 'https://cutt.ly/oVxg2rd',
  healthScore: 2,
}
export const validate = ({ name, value }) => {
  const regExNumber = new RegExp('[0-9]', 'gi')

  if (regExNumber.test(value) && name === 'title') return `can't use numbers`
  if (name === 'healthScore' && value < 100)
    return `Use number between 1 and 100`
}

export default function CreateRecipe() {
  const [input, setInput] = useState(initialInputState)

  const [errors, setErrors] = useState('')

  const dispatch = useDispatch()
  const diets = useSelector((state) => state.diets)

  useEffect(() => {
    dispatch(getDiets())
  }, [dispatch])
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createRecipe(input))
    history.push('/home')
  }
  const handleChange = (e, i) => {
    e.preventDefault()

    if (e.target.name === 'title') {
      setErrors(validate(e.target, errors))
    }
    if (e.target.name === 'steps') {
      const values = { ...input }
      values.steps[i] = e.target.value

      return setInput(values)
    }
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleStepClick = (action, i) => {
    if (action === 'add') {
      setInput({
        ...input,
        steps: [...input.steps, ''],
      })
    }
    if (action === 'del') {
      const values = { ...input }
      values.steps.splice(i, 1)
      setInput(values)
    }
  }

  const handleDietClick = (val) => {
    const originalInput = { ...input }
    if (input.diets.includes(val)) {
      const filtresDiets = originalInput.diets.filter((e) => e !== val)
      originalInput.diets = filtresDiets
      return setInput({ ...originalInput })
    }
    originalInput.diets.push(val)
    return setInput({ ...originalInput })
  }

  return (
    <div className='createBody'>
      <div className='createRecipe'>
        <form
          className='createRecipe-container'
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1>Create Your Own Recipe</h1>
          <div>
            <label>Title</label>
            <input
              required='required'
              type='text'
              name='title'
              value={input.title}
              onChange={(e) => handleChange(e, 0)}
            />
            {errors && <p className='error'>{errors}</p>}
          </div>
          <div>
            <label>Summary</label>
            <input
              required='required'
              type='text'
              name='summary'
              value={input.summary}
              onChange={(e) => handleChange(e, 0)}
            />
          </div>
          <div>
            <label>Health Score: {input.healthScore}</label>
            <input
              required='required'
              type='range'
              name='healthScore'
              value={input.healthScore}
              onChange={(e) => handleChange(e, 0)}
            />
            {errors?.healthScore && (
              <p className='error'>{errors.healthScore}</p>
            )}
          </div>
          <label>Steps</label>

          <div className='stepsCreated-container'>
            {input.steps?.map((s, i) => (
              <div className='createdStep' key={i}>
                <input
                  required='required'
                  type='text'
                  name='steps'
                  value={input.steps[i]}
                  onChange={(e) => handleChange(e, i)}
                />
                {i === input.steps.length - 1 ? (
                  <p
                    className='step-button'
                    onClick={() => handleStepClick('add')}
                  >
                    Add Step
                  </p>
                ) : (
                  false
                )}
                <p
                  className='step-button'
                  onClick={() => handleStepClick('del', i)}
                >
                  Delete
                </p>
              </div>
            ))}
          </div>
          <div>
            <div className='diets-container'>
              {diets?.map((d, i) => (
                <p
                  className={`diet-tag ${
                    input.diets.includes(d.name) ? 'included' : ''
                  }`}
                  key={i}
                  value={d.name}
                  onClick={() => handleDietClick(d.name)}
                >
                  {' '}
                  {d.name}
                </p>
              ))}
            </div>
            <div className='image-container'>
              <img src={input.image} />
            </div>
          </div>
          <button className='button create' type='submit'>
            Create Recipe
          </button>
        </form>
      </div>

      <button className='button' onClick={() => history.goBack()}>
        BACK
      </button>
    </div>
  )
}
