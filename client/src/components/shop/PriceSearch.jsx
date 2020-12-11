import React from 'react'
import { Slider, } from 'antd';


const PriceSearch = ({price, handleSlider}) => {
  return (
    <Slider
      className="ml-4 mr-4"
      tipFormatter={(v) => `${v.toLocaleString()}円`}
      range
      value={price}
      onChange={handleSlider}
      max="300000"
    />
  )
}

export default PriceSearch
