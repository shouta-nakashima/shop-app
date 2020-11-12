import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Register, Login } from './pages/auth/index'
import Home from './pages/Home'

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register}/>
    </Switch>
  )
}

export default App;
