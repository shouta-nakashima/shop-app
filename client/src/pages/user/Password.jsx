import React, {useState} from 'react'
import {UserNav,AdminNav} from '../../components/nav/index'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Spin } from 'antd';

const Password = () => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((state) => ({ ...state }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    //console.log(password);
    await auth.currentUser.updatePassword(password)
      .then(() => {
        setLoading(false)
        setPassword("")
        toast.success('パスワードを更新しました。')
      })
      .catch(err => {
        setLoading(false)
        toast.error('更新に失敗しました。')
      })
  }

  const passwordupdateForm = () =>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          className="form-control"
          placeholder="新しいパスワードを入力してください。"
          disabled={loading}
          value={password}
        />
        <br/>
        <button className="btn btn-primary" disabled={!password || password.length < 6 || loading}>パスワードを変更</button>
      </div>
    </form>
  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className ="container-fluid">
        <div className="row">
          <div className="col-md-2">
            {user.role === 'admin' ? <AdminNav/> : <UserNav/>}
          </div>
          <div className="col">
            <h4 className="text-center pt-3 pb-3">Password Update</h4>
            {passwordupdateForm()}
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default Password
