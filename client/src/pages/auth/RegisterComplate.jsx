import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'


const RegisterComplate = ({history}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistation"));
    console.log(window.location.href);
    console.log(window.localStorage.getItem("emailForRegistation"));
  },[])

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
        console.log("user", user, idTokenResult);
        //redirect
        toast.info( '新規登録が完了しました。')
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
      onChange={e => setPassword(e.target.value)}
      placeholder="Password"
      autoFocus
    />
    <br/>
    <button type="submit" className="btn btn-raised">Sign Up</button>
  </form>
  return (
    <div className="container p-5">
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

