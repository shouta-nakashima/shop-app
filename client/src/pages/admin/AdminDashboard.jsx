import React,{useState, useEffect} from 'react'
import AdminNav from '../../components/nav/AdminNav'
import { getOrders, changeStatus } from '../../functions/admin'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from 'react-toastify'


const AdminDashboard = () => {
  const [orders, setOrders] = useState([])
  const { user } = useSelector((state) => ({ ...state }))

  const loadOrders = () => getOrders(user.token)
    .then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data)
    })
  
  useEffect(() => {
    loadOrders()
  },[])

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token)
      .then((res) => {
        console.log(res.data);
        toast.success('取引情報を更新しました。')
        loadOrders()
      })
  }

  return (
    <div className ="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav/>
        </div>
        <div className="col">
          <h4 className="text-center pt-3 pb-3">Admin Dashboard</h4>
          {JSON.stringify(orders)}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
