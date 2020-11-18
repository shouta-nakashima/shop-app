import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5)
  let history = useHistory()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 1000)
  
  //redirect = 0
  count === 0 && history.push('/')
  // cleanup
  return () => clearInterval(interval)
  }, [count,history])
  return (
    <div className="container p-5 text-center">
      <h4>このページにはアクセス出来ません。</h4>
      <p>あと{count}秒でトップページへリダイレクトします。</p>
    </div>
  )
}

export default LoadingToRedirect
