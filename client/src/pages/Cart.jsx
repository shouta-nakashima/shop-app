import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {ProductCardInCheckout} from '../components/cards/index'
import {userCart} from '../functions/user'

const Cart = ({history}) => {
  const { user, cart } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    },0)
  }

  const saveOrderToDb = () => {
    //console.log('cart',JSON.stringify(cart,null,4));
    userCart(cart, user.token)
      .then((res) => {
        //console.log('CART POST RES', res);
        if(res.data.ok) history.push("/checkout")
    }).catch((err) => console.log('cart save error', err)) 
  }

  const saveCashOrderToDb = () => {
    //console.log('cart',JSON.stringify(cart,null,4));
    dispatch({
      type: "COD",
      payload: true
    })
    userCart(cart, user.token)
      .then((res) => {
        //console.log('CART POST RES', res);
        if(res.data.ok) history.push("/checkout")
    }).catch((err) => console.log('cart save error', err)) 
  }

  const showCartItem = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  )

  return (
    <div className="container-fluid " style={{paddingTop: "100px"}}>
      <div className="row">
        <div className="col-md-8">
          <h4>Cart</h4>
          {!cart.length
            ? <h4>現在カートに商品はありません。 <Link to="/shop">商品を探す</Link></h4>
            : (showCartItem())
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
              <>
                <button
                  onClick={saveOrderToDb}
                  className="btn btn-sm btn-primary mt-2"
                  disabled={!cart.length}
                >
                  オンライン決済で購入
                </button>
                <br/>
                <button
                  onClick={saveCashOrderToDb}
                  className="btn btn-sm btn-warning mt-2"
                  disabled={!cart.length}
                >
                  代金引換で購入
                </button>
              </>
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
