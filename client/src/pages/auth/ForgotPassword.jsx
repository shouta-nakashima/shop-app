import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import { MailOutlined } from '@ant-design/icons';



const ForgotPassword = ({history}) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const {user} = useSelector(state => ({...state}))

  useEffect(() => {
    if (user && user.token) {
      history.push('/')
    }
  },[user,history])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true
    }

    await auth.sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('')
        setLoading(false)
        toast.info('📩ご指定のアドレスにパスワード再設定用のメールを送信しました。')
      })
      .catch((error) => {
        setLoading(false)
        toast.error('🙅‍♂️送信に失敗しました。再度アドレスをお確かめ下さい。')
        console.log(error);
      })
  }

  const resetPasswordForm = () => <form onSubmit={handleSubmit}>
    <div className="form-group">
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="メールアドレスを入力して下さい。"
        autoFocus
        />
    </div>
    <br/>
    <Button
      onClick={handleSubmit}
      type="danger"
      className="mb-3"
      block
      shape="round"
      icon={<MailOutlined />}
      size="large"
      disabled={!email}
    >
      Emailを送信
    </Button>
  </form>
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (<h3 className="text-danger">Loading...</h3>) : (<h3>パスワードをお忘れの方</h3>)}
      <br/>
      {resetPasswordForm()}
    </div>
  )
}

export default ForgotPassword