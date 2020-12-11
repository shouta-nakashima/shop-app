import React from 'react'
import { Checkbox } from 'antd'
import { useDispatch } from 'react-redux'

const ShippingSearch = ({
  setPrice,
  setStar,
  setBrand,
  setCategoryIds,
  setSub,
  setColor,
  setShipping,
  fetchProducts,
  shipping, }) => {
  let dispatch = useDispatch()

  //9 shippingに基づいて商品を表示
  const handleShippingChange = (e) => {
    setSub('')
    dispatch({
      type: "SEARCH_QUERY",
      payload: {text: ""}
    })
    setPrice([0,0])
    setCategoryIds([])
    setStar('')
    setBrand('')
    setColor('')
    setShipping(e.target.value)
    fetchProducts({shipping: e.target.value})
  }
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
