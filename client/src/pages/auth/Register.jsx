import React, { useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import {REACT_APP_REJISTER_REDIRECT_URL} from '../../urlConfig'

const Register = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const config = {
      url: REACT_APP_REJISTER_REDIRECT_URL,
      handleCodeInApp: true
    }
    await auth.sendSignInLinkToEmail(email, config)
    toast.success(`${ email }宛に登録用のメールを送信しました。`)
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
    <button type="submit" className="btn btn-raised">Sign Up</button>
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
