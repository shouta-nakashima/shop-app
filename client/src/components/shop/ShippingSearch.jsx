import React from 'react'
import {Checkbox} from 'antd'

const ShippingSearch = ({handleShippingChange, shipping,}) => {
  return (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingChange}
        value="配送可能"
        checked={shipping === "配送可能"}
      >
        配送可能
      </Checkbox>
      <br/>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingChange}
        value="店舗受取のみ"
        checked={shipping === "店舗受取のみ"}
      >
        店舗受取
      </Checkbox>
    </>
  )
}

export default ShippingSearch
