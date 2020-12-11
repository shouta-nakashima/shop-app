import React from 'react'

const AllOrderList = ({cart, getTotal}) => {
  return (
    <>
      <h4>注文商品一覧</h4>
      <hr />
      {cart.map((c, i) => (
        <div key={i}>
          <p>{c.title} x {c.count} = {(c.price * c.count).toLocaleString()}円</p>
        </div>
      ))}
      <hr />
      合計: {getTotal().toLocaleString()}円
    </>
  )
}

export default AllOrderList
