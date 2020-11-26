import React from 'react'
import StarRating from 'react-star-ratings'

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingArray = p && p.ratings
    let total = []
    let length = ratingArray.length
    //console.log('length', length);
    
    ratingArray.map((r) => total.push(r.star))

    let totalReduced = total.reduce((p, n) => p + n, 0)
    //console.log('totalReduced', totalReduced);

    let highest = length * 5
    //console.log('highest', highest);
    
    let result = (totalReduced * 5) / highest
    //console.log('result', result);

    return (
      <div className=" text-center pt-1 pb-3 ">
        <span>
          <StarRating starDimension="20px" starSpacing="2px" rating={result} starRatedColor="orange" editing={false} /> ({p.ratings.length})
        </span>
        
      </div>
    )
  }
}