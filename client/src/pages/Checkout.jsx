import React from 'react'

const Checkout = () => {

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
        <h4>注文内容</h4>
        <hr />
        <p>Products x</p>
        <hr />
        <p>List of product</p>
        <hr />
        <p>カートの合計</p>

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
