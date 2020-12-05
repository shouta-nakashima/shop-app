import React from 'react'
import { Link } from 'react-router-dom'
import ListItem from '../list/ItemList'

const ProductListItem = ({ product }) => {
  const {price, category, subs, shipping, color, brand, quantity, sold} = product
  const oldPrice = new Number(price)
  const newPrice = oldPrice.toLocaleString()
  
  return (
    <ul className="list-group">
      <ListItem text={"Price"} products={ `${newPrice} 円`}/>
      {category && <li className="list-group-item">
        Category
        <Link to={`/category/${category.slug}`} className="label label-default label-pill pull-xs-right">
          {category.name}
        </Link>
      </li>}

      {subs && (
        <li className="list-group-item">
          Sub Categories
          {subs.map((s) => (
            <Link
              to={`/sub/${ s.slug }`}
              className="label label-default label-pill pull-xs-right"
              key={s._id}
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}
      <ListItem text={"Shipping"} products={shipping} />
      <ListItem text={"Color"} products={color} />
      <ListItem text={"Brand"} products={brand} />
      <ListItem text={"Available"} products={quantity < 1 ? <p className="text-danger mr-0">SOLD OUT</p> : quantity} />
      <ListItem text={"Sold"} products={ sold}/>
    </ul>
  )
}

export default ProductListItem
