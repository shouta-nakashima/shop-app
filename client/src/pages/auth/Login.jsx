import React, { useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { REACT_APP_REJISTER_REDIRECT_URL } from '../../urlConfig'
import { Button } from 'antd'
import { MailOutlined } from '@ant-design/icons';
import{ useDispatch } from 'react-redux'

const Login = ({history}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  let dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      const {user}= result
      const idTokenResult = await user.getIdTokenResult()
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token
        }
      })
      toast.info('ログインしました。')
      history.push('/')
    } catch (error) {
      console.log(error);
      toast.error('ログインに失敗しました。再度お客様情報をお確かめ下さい。')
      setLoading(false)
    }
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
          <h3>Login</h3>
          <br/>
          {loginForm()}
        </div>
      </div>
    </div>
  )
}

export default Login
