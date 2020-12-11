import React from 'react'
import { useDispatch } from 'react-redux'

const SubsSearch = ({
  subs,
  setPrice,
  setStar,
  setBrand,
  setCategoryIds,
  setSub,
  setColor,
  setShipping,
  fetchProducts }) => {
  
  let dispatch = useDispatch()
  
  //6 sub category に基づいて商品を表示
  const handleSubs = (sub) => {
    //console.log(sub);
    setSub(sub)
    dispatch({
      type: "SEARCH_QUERY",
      payload: {text: ""}
    })
    setPrice([0,0])
    setCategoryIds([])
    setStar('')
    setBrand("")
    setColor('')
    setShipping('')
    fetchProducts({sub: sub})
  }

  return (
    <div>
      {subs.map((s) =>
      <div
        key={s._id}
        onClick={() => handleSubs(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{cursor: "pointer"}}
      >
        {s.name}
      </div>)
      }
    </div>
  )
}

export default SubsSearch
