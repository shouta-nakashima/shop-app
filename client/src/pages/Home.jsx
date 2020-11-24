import React, {useState, useEffect} from 'react'
import { getProductsByCount } from '../functions/product'
import { Spin } from 'antd';
import ProductCard from '../components/cards/ProductCard'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAllProducts()
  }, [])
  
  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(3)
      .then((res) => {
        setProducts(res.data)
        setLoading(false)
      })
  }
  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className="jumbotron">
        <h4>Home</h4>
      </div>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4">
              <ProductCard product={ product}/>
            </div>
          ))}
        </div>
      </div>
    </Spin>
  )
}

export default Home
