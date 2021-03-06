import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { Button } from 'antd'
import { LoginOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux'
import { createOrUpdateUser } from "../../functions/auth";


const RegisterComplate = ({history}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let dispatch = useDispatch()
  //const {user} = useSelector(state => ({...state}))

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistation"));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem("emailForRegistation"));
  },[history])

  const handleSubmit = async (e) => {
    e.preventDefault()
    //validation
    if (!email || !password) {
      toast.error('EmailとPasswordは必須です。')
      return
    }
    if (password.length < 6) {
      toast.error('Passwordは6文字以上で入力して下さい。')
      return
    }
    try {
      const result = await auth.signInWithEmailLink(email, window.location.href)
      //console.log(result);
      if (result.user.emailVerified) {
        //remove user email from local storage
        window.localStorage.removeItem("emailForRegistation")
        //get user id token
        let user = auth.currentUser
        await user.updatePassword(password)
        const idTokenResult = user.getIdTokenResult()
        //redux store
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
        })
        .catch()
        //redirect
        toast.info('👍新規登録が完了しました。')
        history.push('/')
      }
    } catch (error) {
      //error
      //console.log(error);
      toast.error('セッションが無効になりました。再度SignUpより登録をお願いします。')
    }
  }

  

  const complateRejisterForm = () => <form onSubmit={handleSubmit}>
    <input
      type="email"
      className="form-control"
      value={email}
      disabled
    />
    <br/>
    <input
      type="password"
      className="form-control"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      autoFocus
    />
    <br/>
    <Button
      onClick={handleSubmit}
      type="primary"
      className="mb-3"
      block
      shape="round"
      icon={<LoginOutlined />}
      size="large"
      disabled={!email}
    >
      新規登録する
    </Button>
  </form>
  
  return (
    <div className="container" style={{ paddingTop: "200px", minHeight: "575px" }}>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3>Sign Up Complate</h3>
          {complateRejisterForm()}
        </div>
      </div>
    </div>
  )
}

export default RegisterComplate

