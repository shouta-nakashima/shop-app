import React from 'react'

const ShowPaymentInfo = ({order}) => {
  return (
    <div>
      <p>
        <span>ご注文番号：{order.paymentIntent.id}</span><br />
        <span>お支払い金額：{order.paymentIntent.amount.toLocaleString()}円</span><br/>
        <span>ご注文日時：{new Date(order.paymentIntent.created * 1000).toLocaleString()}</span><br/>
        <span className="badge bg-primary text-white">お取引状況：{order.orderStatus }</span>
      </p>
    </div>
  )
}

export default ShowPaymentInfo
