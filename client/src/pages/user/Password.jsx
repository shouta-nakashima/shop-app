import React, {useState} from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { Spin } from 'antd';

const Password = () => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  

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
      <div className="col-md-8 offset-md-2 " style={{paddingTop: "70px"}}>
        <h4 className="text-center pt-3 pb-3">Password Update</h4>
        {passwordupdateForm()}
      </div>
    </Spin>
  )
}

export default Password
