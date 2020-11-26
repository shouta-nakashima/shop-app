import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {getCategories} from '../../functions/category'

const CategoryList = ({setLoading}) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    setLoading(true)
    getCategories().then(c => {
      setCategories(c.data)
      setLoading(false)
      
    })
  },[])

  const showCategories = () => 
    categories.map((c) => (
      <div key={c._id} className=" col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
        <Link to={`/category/${c.slug}`}>{c.name}</Link>
      </div>
    ))
  
  return (
    <div className="container">
      <div className="row">
        {showCategories()}
      </div>
    </div>
  )
}

export default CategoryList
