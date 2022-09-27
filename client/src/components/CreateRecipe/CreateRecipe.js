import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getDiets, createRecipe } from '../../redux/actions'
import './CreateRecipe.css'

const initialInputState = {
  title: '',
  image: '',
  healthScore: 0,
  summary: '',
  diets: [],
  steps: [''],
  image: 'https://cutt.ly/oVxg2rd',
  healthScore: 2,
}
export const validate = ({ name, value },errors) => {
  const regExNumber = new RegExp(`[0-9]`, 'g')
  const regExSymbols = new RegExp(`[^\\w\\s]`, 'g')

  if ((regExNumber.test(value) || regExSymbols.test(value)) && name === 'title'){
    return {...errors,title:`Only Use Letters`}
  }
  if (name === 'healthScore' && value < 100){
    return { ...errors, healthScore: `Use number between 1 and 100` }
  }
  return {}
}

export default function CreateRecipe() {
  const [input, setInput] = useState({
    ...initialInputState,
    diets: [],
    steps: [''],
  })

  const [errors, setErrors] = useState({})
  const [alert, setAlert] = useState(false)

  const dispatch = useDispatch()
  const diets = useSelector((state) => state.diets)

  useEffect(() => {
    dispatch(getDiets())
  }, [dispatch])
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('errors',errors)
    if (Object?.keys(errors).some(e=>e!=='')) {
      return setAlert(true)
    }
    dispatch(createRecipe(input))
    setInput(initialInputState)
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
    <div>
      {alert && (
        <div className='alert'>
          <div className='alert-container'>
            <p>Please correct the information before send</p>
            <button className='button' onClick={() => setAlert(false)}>
              Ok
            </button>
          </div>
        </div>
      )}
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
              {errors?.title && <p className='error'>{errors.title}</p>}
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
            <ol className='stepsCreated-container'>
              {input.steps.length === 0 && (
                <p
                  className='step-button'
                  onClick={() => handleStepClick('add')}
                >
                  Add Step
                </p>
              )}
              {input.steps?.map((s, i) => (
                <li key={i}>
                  <div className='createdStep'>
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
                    ) : null}
                    <p
                      className='step-button'
                      onClick={() => handleStepClick('del', i)}
                    >
                      Delete
                    </p>
                  </div>
                </li>
              ))}
            </ol>
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
        <button
          className='button'
          onClick={() => {
            history.goBack()
          }}
        >
          BACK
        </button>
      </div>
    </div>
  )
}
