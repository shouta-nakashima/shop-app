import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getUserCart} from '../functions/user'

const Checkout = () => {

  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()
  const {user} = useSelector((state) => ({...state}))

  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
        console.log('user cart res', JSON.stringify(res.data,null,4));
        setProducts(res.data.products)
        setTotal(res.data.cartTotal)
      })
  },[])

  const saveAddressToDb = () => {
    //
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>配送先住所</h4>
        <br />
        <br />
        textarea
        <button
          className="btn btn-primary mt-2"
          onClick={saveAddressToDb}
        >SAVE</button>
        <hr />
        <h4>クーポンを使う</h4>
        <br />
        coupon input button
      </div>
      <div className="col-md-6">
        <h4>ご注文内容の確認</h4>
        <hr />
        <p>現在{ products.length}つの商品が入っています</p>
        <hr />
        {products.map((p,i) => (
          <div key={i}>
            <p>{p.product.title} ({p.color}) x {p.count} = { (p.product.price * p.count).toLocaleString()}円</p>
          </div>
        ))}
        <hr />
        <p>カートの合計：{ total.toLocaleString()}円</p>

        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary">注文する</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary">空のカート</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
