import React from 'react'
import { Radio } from 'antd'
import { useDispatch } from 'react-redux'


const BrandsSearch = ({
  brand,
  brands,
  setPrice,
  setStar,
  setBrand,
  setCategoryIds,
  setSub,
  setColor,
  setShipping,
  fetchProducts }) => {

  let dispatch = useDispatch()
  // 7 brandに基づいて商品を表示

  const handleBrand = (e) => {
    setSub('')
    dispatch({
      type: "SEARCH_QUERY",
      payload: {text: ""}
    })
    setPrice([0,0])
    setCategoryIds([])
    setStar('')
    setColor('')
    setShipping('')
    setBrand(e.target.value)
    fetchProducts({brand: e.target.value})
  }

  return (
    <div>
      {brands.map((b) =>
      <Radio
        key={b}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-1 pr-4"
      >
        {b}
      </Radio>
    )}
    </div>
  )
}

export default BrandsSearch
