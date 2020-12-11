import React from 'react'
import { useDispatch } from 'react-redux'
import { Checkbox } from 'antd';

const CategoriesSearch = ({
  categories,
  categoryIds,
  setPrice,
  setStar,
  setBrand,
  setCategoryIds,
  setSub,
  setColor,
  setShipping,
  fetchProducts }) => {
  let dispatch = useDispatch()
  
  // category に基づいて製品をload
  const handleCheck = e => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: {text: ""}
    })
    setPrice([0,0])
    setStar("")
    setSub('')
    setBrand("")
    setColor('')
    setShipping('')
    //console.log(e.target.value);
    let inTheState = [...categoryIds]
    let justChecked = e.target.value
    let foundInTheState = inTheState.indexOf(justChecked) //index or -1

    //indexOf? 見つからない場合は-1を返し、そうでない場合はインデックスを返す
    if (foundInTheState === -1) {
      inTheState.push(justChecked)
    } else {
      // 見つかった場合は、インデックスから1つのアイテムを引き出す
      inTheState.splice(foundInTheState, 1)
    }
    setCategoryIds(inTheState)
    //console.log(inTheState);
    fetchProducts({category: inTheState})
  }


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
