import React, {useState, useEffect} from 'react'
import { getProductsByCount } from '../functions/product'
import { Spin } from 'antd';
import ProductCard from '../components/cards/ProductCard'
import Jumbotron from '../components/cards/Jumbotron'

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
      <div className="jumbotron text-info h1 font-weight-bold text-center">
        <Jumbotron text={ ['Welcome to SHOP APP','Thanks for coming!!','Have fun slowly']}/>
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
