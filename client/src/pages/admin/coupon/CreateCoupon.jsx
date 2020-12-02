import React,{useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import { getCoupons, deleteCoupon, createCoupon } from '../../../functions/coupon'
import { DeleteOutlined } from '@ant-design/icons'
import { Spin} from 'antd';
import AdminNav from '../../../components/nav/AdminNav'
import "react-datepicker/dist/react-datepicker.css";

const CreateCoupon = () => {
  const [name, setName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [discount, setDiscount] = useState("")
  const [loading, setLoading] = useState(false)
  const {user} = useSelector((state) => ({...state}))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    //console.table(name, expiry, discount);
    createCoupon({ name, expiry, discount }, user.token)
    .then((res) => {
      setLoading(false)
      setName('')
      setExpiry('')
      setDiscount('')
      toast.success(`${res.data.name}を作成しました。`)
    }).catch((err) => console.log('create error', err))
  }

  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav/>
          </div>
          <div className="col">
            <h4 className="text-center pt-3 pb-3">Create Coupon</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="text-muted">クーポン名</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  autoFocus
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-muted">ディスカウント</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setDiscount(e.target.value)}
                  value={discount}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-muted">有効期限</label>
                <br/>
                <DatePicker
                  className="form-control"
                  selected={new Date()}
                  value={expiry}
                  onChange={(date) => setExpiry(date)}
                  reqired
                />
              </div>
              <button className="btn btn-outline-primary">save</button>
            </form>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default CreateCoupon
