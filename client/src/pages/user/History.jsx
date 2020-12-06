import React,{useState, useEffect} from 'react'
import UserNav from '../../components/nav/UserNav'
import { getUserOrders } from '../../functions/user'
import { useDispatch, useSelector } from 'react-redux'
import { CheckOutlined, CloseCircleOutlined } from '@ant-design/icons'
import {toast} from 'react-toastify'

const History = () => {
  const [orders, setOrders] = useState([])
  const { user } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()

  const loadUserOrders = () => {
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4))
      setOrders(res.data)
    })
    
  }

  useEffect(() => {
    loadUserOrders()
  }, [])
  
  return (
    <div className ="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav/>
        </div>
        <div className="col">user history page</div>
      </div>
    </div>
  )
}

export default History
