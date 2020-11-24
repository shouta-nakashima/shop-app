import React, {useState, useEffect} from 'react'
import { getProductsByCount } from '../functions/product'
import { Spin } from 'antd';

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAllProducts()
  }, [])
  
  const loadAllProducts = () => {
    getProductsByCount(3)
      .then((res) => {
        setProducts(res.data)
      })
  }
  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <p>Home</p>
      {JSON.stringify(products)}
    </Spin>
  )
}

export default Home
