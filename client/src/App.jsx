import React, {useEffect} from 'react'
import { Switch, Route } from 'react-router-dom'
import { Register, Login, RegisterComplate, ForgotPassword } from './pages/auth/index'
import { History, Wishlist, Password } from './pages/user/index'
import {UserRoute,AdminRoute} from './components/routes/index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Header from './components/nav/Header'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { currentUser } from './functions/auth'
import AdminDashboard from './pages/admin/AdminDashboard'
import { CategoryCreate, CategoryUpdate } from './pages/admin/category/index'
import { SubCreate, SubUpdate } from './pages/admin/sub/index'
import {CreateProduct} from './pages/admin/product/index'

const App = () => {

  const dispatch = useDispatch()
  //check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        console.log("user", user);
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch(err => console.log(err));
      }
    })
    return () => unsubscribe()
  },[dispatch])
  return (
    <>
      <Header />
      <ToastContainer/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complate" component={RegisterComplate} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/product" component={CreateProduct} />
      </Switch>
    </>
  )
}

export default App;
