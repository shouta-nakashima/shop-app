import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { Button } from 'antd'
import { MailOutlined } from '@ant-design/icons';

const Register = ({history}) => {
  const [email, setEmail] = useState('')
  const {user} = useSelector(state => ({...state}))

  useEffect(() => {
    if (user && user.token) {
      history.push('/')
    }
  },[user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const config = {
      url: process.env.REACT_APP_REJISTER_REDIRECT_URL,
      handleCodeInApp: true
    }
    await auth.sendSignInLinkToEmail(email, config)
    toast.success(`📩${ email }宛に登録用のメールを送信しました。`)
    //save user Email LocalStorage
    window.localStorage.setItem('emailForRegistation', email)
    //clear state
    setEmail("")
  }

  const registerform = () => <form onSubmit={handleSubmit}>
    <input
      type="email"
      className="form-control"
      value={email}
      onChange={e => setEmail(e.target.value)}
      placeholder="Email"
      autoFocus
    />
    <br/>
    <Button
      onClick={handleSubmit}
      type="primary"
      className="mb-3"
      block
      shape="round"
      icon={<MailOutlined />}
      size="large"
      disabled={!email}
    >
      新規登録用メールの送信
    </Button>
  </form>
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3>Sign Up</h3>
          <br/>
          {registerform()}
        </div>
      </div>
    </div>
  )
}

export default Register
