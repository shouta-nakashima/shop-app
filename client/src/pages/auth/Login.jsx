import React, { useState, useEffect } from 'react'
import { auth, googleAuthProvider } from '../../firebase'
import { toast } from 'react-toastify'
import { Button } from 'antd'
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrUpdateUser } from "../../functions/auth";


const Login = ({history}) => {
  const [email, setEmail] = useState('fantajista5.6nakaji.s@gmail.com')
  const [password, setPassword] = useState('test1234')
  const [loading, setLoading] = useState(false)
  let dispatch = useDispatch()
  const {user} = useSelector(state => ({...state}))

  const roleBaedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push('/admindashboard')
    } else {
      history.push('/user/history')
    }
  }

  useEffect(() => {
    if (user && user.token) {
      history.push('/')
    }
  },[user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      const {user}= result
      const idTokenResult = await user.getIdTokenResult()

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id
            }
          })
          roleBaedRedirect(res)
        })
        .catch(err => console.log(err))
      
      toast.info('ログインしました。')
      //history.push('/')
    } catch (error) {
      console.log(error);
      toast.error('ログインに失敗しました。再度お客様情報をお確かめ下さい。')
      setLoading(false)
    }
  }

  const googleLogin = async () => {
    auth.signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result
        const idTokenResult = await user.getIdTokenResult()
        createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id
            }
          })
          roleBaedRedirect(res)
        })
        .catch(err => console.log(err))
        toast.info('👍ログインしました。')
        // history.push('/')
      }).catch((error) => {
        console.log(error);
        toast.error('🙅‍♂️ログインに失敗しました。入力情報を再度ご確認ください。')
      })
  }

  const loginForm = () => <form onSubmit={handleSubmit}>
    <div className="form-group">
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        autoFocus
        />
    </div>
    <br />
    <div className="form-group">
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="パスワード"
        />
    </div>
    <br/>
    <Button
      onClick={handleSubmit}
      type="primary"
      className="mb-3"
      block
      shape="round"
      icon={<MailOutlined />}
      size="large"
      disabled={!email || password.length < 6}
    >
      Email/Passwordでログイン
    </Button>
  </form>
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (<h3 className="text-danger">Loading...</h3>) : (<h3>Login Page</h3>)  }
          <br/>
          {loginForm()}
          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Googleアカウントでログイン
          </Button>
          <Link to="/forgot/password" className="float-right text-danger">パスワードをお忘れの方</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
