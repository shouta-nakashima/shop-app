import React from 'react'
import { Radio } from 'antd'
import { useDispatch } from 'react-redux'

const ColorSearch = ({
  colors,
  color,
  setPrice,
  setStar,
  setBrand,
  setCategoryIds,
  setSub,
  setColor,
  setShipping,
  fetchProducts }) => {
  let dispatch = useDispatch()

  // 8 colorに基づいて商品を表示

  const handleColor = (e) => {
    setSub('')
    dispatch({
      type: "SEARCH_QUERY",
      payload: {text: ""}
    })
    setPrice([0,0])
    setCategoryIds([])
    setStar('')
    setBrand('')
    setShipping('')
    setColor(e.target.value)
    fetchProducts({color: e.target.value})
  }


  return (
    <div>
      {colors.map((c) =>
      <Radio
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-1 pr-4"
      >
        {c}
      </Radio>
    )}
    </div>
  )
}

export default ColorSearch
