import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {getSubs} from '../../functions/sub'

const SubList = ({setLoading}) => {
  const [subs, setSubs] = useState([])

  useEffect(() => {
    setLoading(true)
    getSubs().then(s => {
      setSubs(s.data)
      setLoading(false)
      
    })
  },[])

  const showSubs = () => 
    subs.map((s) => (
      <div key={s._id} className=" col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
        <Link to={`/sub/${s.slug}`}>{s.name}</Link>
      </div>
    ))
  
  return (
    <div className="container">
      <div className="row">
        {showSubs()}
      </div>
    </div>
  )
}

export default SubList
