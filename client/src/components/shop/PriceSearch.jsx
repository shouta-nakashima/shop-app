import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Slider, } from 'antd';


const PriceSearch = ({
  price,
  ok,
  setPrice,
  setStar,
  setBrand,
  setCategoryIds,
  setSub,
  setColor,
  setShipping,
  setOk,
  fetchProducts
}) => {

  let dispatch = useDispatch()

  // priceに基づいて製品をload
  useEffect(() => {
    //console.log('price response');
    fetchProducts({price})
  }, [ok])

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: {text: ""}
    })
    setStar("")
    setBrand("")
    setCategoryIds([])
    setSub('')
    setColor('')
    setShipping('')
    setPrice(value)
    setTimeout(() => {
      setOk(!ok)
    },300)
  }
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
