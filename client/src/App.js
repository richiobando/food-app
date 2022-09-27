import './App.css'
import { Route } from 'react-router-dom'

import Home from './components/Home/Home'
import LandingPage from './components/LandingPage/LandingPage'
import CreateRecipe from './components/CreateRecipe/CreateRecipe'
import RecipeDetail from './components/RecipeDetail/RecipeDetail'
import UpdateDetail from './components/UpdateRecipe/UpdateRecipe'
import PageNotFound from './components/PageNotFound/PageNotFound'

function App() {
  return (
    <div className='App'>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route path='/create' component={CreateRecipe} />
      <Route path='/update/:id' component={UpdateDetail} />
      <Route path='/recipes/:id' component={RecipeDetail} />
      {/* <Route component={PageNotFound} /> */}
    </div>
  )
}

export default App

/* 
<Route path='*' exact={true} component={My404Component} />
 // Or don't mention path
<Route component={My404Component} />
*/
