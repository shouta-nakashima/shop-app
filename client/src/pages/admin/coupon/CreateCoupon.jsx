import React,{useState, useEffect} from 'react'
import {useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import { getCoupons, deleteCoupon, createCoupon } from '../../../functions/coupon'
import { DeleteOutlined } from '@ant-design/icons'
import { Spin} from 'antd';
import "react-datepicker/dist/react-datepicker.css";

const CreateCoupon = () => {
  const [name, setName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [discount, setDiscount] = useState("")
  const [loading, setLoading] = useState(false)
  const [coupons, setCoupons] = useState([])
  const {user} = useSelector((state) => ({...state}))

  const loadAllCoupon = () => getCoupons().then((res) => setCoupons(res.data))

  useEffect(() => {
    loadAllCoupon()
  },[])

  const handleDelete = (couponId) => {
    if (window.confirm('削除しますか？')) {
      setLoading(true)
      deleteCoupon(couponId, user.token).then((res) => {
        loadAllCoupon()
        setLoading(false)
        toast.error(`${res.data.name}を削除しました。`)
      }).catch((err) => console.log(err))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    //console.table(name, expiry, discount);
    createCoupon({ name, expiry, discount }, user.token)
    .then((res) => {
      setLoading(false)
      loadAllCoupon()
      setName('')
      setExpiry('')
      setDiscount('')
      toast.success(`${res.data.name}を作成しました。`)
    }).catch((err) => console.log('create error', err))
  }

  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className="container-fluid" style={{paddingTop: "70px"}}>
        <div className="row">
          <div className="col-md-8 offset-md-2">
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
                  selected={expiry}
                  value={expiry}
                  onChange={(date) => setExpiry(date)}
                  reqired
                />
              </div>
              <button className="btn btn-outline-primary">save</button>
            </form>
            <h4>{ coupons.length}つのクーポンが作成されています。</h4>
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th scope="col">クーポン名</th>
                  <th scope="col">有効期限</th>
                  <th scope="col">ディスカウント</th>
                  <th className="text-center text-danger" scope="col">削除</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((c) => 
                  <tr key={c._id}>
                    <th>{c.name}</th>
                    <th>{new Date(c.expiry).toLocaleDateString()}まで</th>
                    <th>{c.discount}% off</th>
                    <th
                      className="text-center text-danger pointer"
                      onClick={() => handleDelete(c._id)}
                    >
                      <DeleteOutlined />
                    </th>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default CreateCoupon
