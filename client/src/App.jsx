import React, {useEffect} from 'react'
import { Switch, Route } from 'react-router-dom'
import { Register, Login, RegisterComplate } from './pages/auth/index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Header from './components/nav/Header'
import { auth } from './firebase'
import {useDispatch} from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  //check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        console.log(user);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
        })
      }
    })
    return () => unsubscribe()
  },[])
  return (
    <>
      <Header />
      <ToastContainer/>
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
