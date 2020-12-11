import React from 'react'
import {Star} from '../../components/forms/index'
import { useDispatch } from 'react-redux'

const StarSearch = ({
  setPrice,
  setStar,
  setBrand,
  setCategoryIds,
  setSub,
  setColor,
  setShipping,
  fetchProducts }) => {
  
  let dispatch = useDispatch()

  //5 star ratingで商品を表示
  const handleStarClick = (num) => {
    //console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: {text: ""}
    })
    setPrice([0,0])
    setCategoryIds([])
    setSub('')
    setStar(num)
    setBrand("")
    setColor('')
    setShipping('')
    fetchProducts({stars: num})
  }

  return (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} /><br/>
      <Star starClick={handleStarClick} numberOfStars={4} /><br/>
      <Star starClick={handleStarClick} numberOfStars={3} /><br/>
      <Star starClick={handleStarClick} numberOfStars={2} /><br/>
      <Star starClick={handleStarClick} numberOfStars={1}/>
    </div>
  )
}

export default StarSearch
