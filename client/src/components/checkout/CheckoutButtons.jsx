import React from 'react'
import {useHistory} from 'react-router-dom'

const CheckoutButtons = ({ addressSaved, products, emptyCart, setCashOrder, COD }) => {
  const history = useHistory()
  return (
    <div className="row">
      <div className="col-md-6">
        {COD ? (<button
          className="btn btn-primary btn-raised"
          disabled={!addressSaved || !products.length}
          onClick={setCashOrder}
        >
          代金引換で購入する
        </button>)
          : (<button
          className="btn btn-primary btn-raised"
          disabled={!addressSaved || !products.length}
          onClick={() => history.push('/payment')}
        >
          オンライン決済で購入する
        </button>)}
      </div>
      <div className="col-md-6">
        <button
          onClick={emptyCart}
          disabled={!products.length}
          className="btn btn-danger btn-raised"
        >
          カートを空にする
        </button>
      </div>
    </div>
  )
}

export default CheckoutButtons
