import React from 'react'
import { Link } from 'react-router-dom'


const OrderListButtons = ({user, cart, saveOrderToDb, saveCashOrderToDb}) => {
  return (
    <>
      {user ? (
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
    </>
  )
}

export default OrderListButtons
