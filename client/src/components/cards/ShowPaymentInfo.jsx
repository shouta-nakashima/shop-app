import React from 'react'

const ShowPaymentInfo = ({order,showStatus = true}) => {
  return (
    <div>
      <p>
        <span>お支払い金額：{order.paymentIntent.amount.toLocaleString()}円</span><br/>
        <span>ご注文日時：{new Date(order.createdAt).toLocaleString()}</span><br />
        {order.paymentIntent.status === "代金引換" && <span className="badge bg-warning text-white">{order.paymentIntent.status }</span>}<br/>
        {showStatus && <span className="badge bg-primary text-white">お取引状況：{order.orderStatus }</span>}
      </p>
    </div>
  )
}

export default ShowPaymentInfo
