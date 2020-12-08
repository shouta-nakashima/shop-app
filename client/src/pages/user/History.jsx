import React,{useState, useEffect} from 'react'
import UserNav from '../../components/nav/UserNav'
import { getUserOrders } from '../../functions/user'
import { useDispatch, useSelector } from 'react-redux'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import {toast} from 'react-toastify'
import { ShowPaymentInfo } from '../../components/cards/index'
import {PDFDownloadLink} from '@react-pdf/renderer';
import Invoice from '../../components/order/Invoice'

const History = () => {
  const [orders, setOrders] = useState([])
  const { user } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()

  const loadUserOrders = () => {
    getUserOrders(user.token).then((res) => {
      //console.log(JSON.stringify(res.data, null, 4))
      setOrders(res.data)
    })
    
  }

  useEffect(() => {
    loadUserOrders()
  }, [])

  const showOrderInTable = (order) =>
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p, i) => (
        <tr key={i}>
            <td><b>{p.product.title}</b></td>
            <td>{p.product.price.toLocaleString()}円</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>{p.product.shipping === "Yes" ? <CheckCircleOutlined style={{color: "green"}}/> : <CloseCircleOutlined style={{color: "red"}}/>}</td>
        </tr>
        ))}
      </tbody>
    </table>

  const showEachOrders = () => orders.reverse().map((order, i) => (
    <div key={i} className="m-5 p-3 card">
      <ShowPaymentInfo order={ order}/>
      {showOrderInTable(order)}
      <div className="row">
        <div className="col">
          {showDouwloadLink(order)}
        </div>
      </div>
    </div>
  ))

  const showDouwloadLink = (order) => (
    <PDFDownloadLink
      document={
        <Invoice order={ order}/>
      }
      fileName="shop-app-invoice.pdf"
      className="btn btn-sm btn-outline-primary btn-block"
    >
      領収書をダウンロード
    </PDFDownloadLink>
  )
  
  return (
    <div className ="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav/>
        </div>
        <div className="col text-center">
          <h4 className="mt-3">{orders.length > 0 ? "購入履歴一覧" : "現在購入履歴はありません。"}</h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  )
}

export default History
