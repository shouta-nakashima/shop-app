import React from 'react'
import {Star} from '../../components/forms/index'

const StarSearch = ({handleStarClick}) => {
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
