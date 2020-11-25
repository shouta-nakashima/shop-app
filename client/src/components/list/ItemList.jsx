import React from 'react'

const ItemList = ({text,products}) => {
  return (
    <li className="list-group-item">
      {text}
      <span className="label label-default label-pill pull-xs-right">
        {products}
      </span>
    </li>
  )
}

export default ItemList
