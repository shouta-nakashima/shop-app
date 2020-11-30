import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

const Cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    },0)
  }

  const saveOrderToDb = () => {
    //
  }
  return (
    <div className="container-fluid pt-2 ">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart</h4>
          {!cart.length
            ? <h4>現在カートに商品はありません。 <Link to="/shop">商品を探す</Link></h4>
            : <p>{`現在${ cart.length }個の商品がカートに入っています。`}</p>
          }
        </div>
        <div className="col-md-4">
          <h4>注文商品一覧</h4>
          <hr />
          {cart.map((c, i) => (
            <div key={i}>
              <p>{c.title} x {c.count} = {(c.price * c.count).toLocaleString()}円</p>
            </div>
          ))}
          <hr />
          合計: {getTotal().toLocaleString()}円
          <hr/>
          {
            user ? (
              <button
                onClick={saveOrderToDb}
                className="btn btn-sm btn-primary mt-2"
                disabled={!cart.length}
              >
                購入に進む
              </button>
            ) : (
                <button
                  className="btn btn-sm btn-primary mt-2"
                >
                  <Link to={{
                    pathname: "/login",
                    state: {from: "cart"}
                  }}>
                    ログインして購入に進む
                  </Link>
                </button>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Cart
