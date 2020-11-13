import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Register, Login, RegisterComplate } from './pages/auth/index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Header from './components/nav/Header'

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer position="top-center"/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complate" component={RegisterComplate}/>
      </Switch>
    </>
  )
}

export default App;
