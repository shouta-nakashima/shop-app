import React from 'react'
import { ProductCardInCheckout } from '../../components/cards/index'
import { Link } from 'react-router-dom'

const ItemTable = ({cart}) => {
  return (
    <>
      {!cart.length
        ? <h4>現在カートに商品はありません。 <Link to="/shop">商品を探す</Link></h4>
        :
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
      }
    </>
  )
}

export default ItemTable
