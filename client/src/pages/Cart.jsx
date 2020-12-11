import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userCart } from '../functions/user'
import {ItemTable, OrderListButtons, AllOrderList} from '../components/cart/index'

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

  return (
    <div className="container-fluid " style={{paddingTop: "100px", minHeight: "575px"}}>
      <div className="row">
        <div className="col-md-8">
          <h4>Cart</h4>
          <ItemTable
            cart={cart}
          />
        </div>
        <div className="col-md-4">
          <AllOrderList
            cart={cart}
            getTotal={getTotal}
          />
          <hr/>
          <OrderListButtons
            user={user}
            cart={cart}
            saveCashOrderToDb={saveCashOrderToDb}
            saveOrderToDb={saveOrderToDb}
          />
        </div>
      </div>
    </div>
  )
}

export default Cart
