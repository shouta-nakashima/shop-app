import React from 'react'
import {Radio} from 'antd'

const BrandsSearch = ({brand, brands, handleBrand}) => {
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
