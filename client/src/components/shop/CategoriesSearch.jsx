import React from 'react'
import { Checkbox } from 'antd';

const CategoriesSearch = ({categories, handleCheck, categoryIds}) => {
  return (
    <div>
      {categories.map((c) => (
        <div key={c._id}>
        <Checkbox
          onChange={handleCheck} 
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br/>
      </div>
      ))}
    </div>
  )
}

export default CategoriesSearch
