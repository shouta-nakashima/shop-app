import React,{useState, useEffect} from 'react'
import { getProductsByCount } from '../functions/product'
import {useSelector, useDispatch} from 'react-redux'
import {ProductCard} from '../components/cards/index'
import { Spin } from 'antd';

const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAllProducts()
  },[])

  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data)
      setLoading(false)
    })
  }

  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            searth/filter menu
          </div>
          <div className="col-md-9">
            <h4>Products</h4>
            {products.length < 1 && <p>No Products</p>}
            <div className="row pb-5">
              {products.map((p) => (
                <div key={p._id} className="col-md-4 mt-3">
                  <ProductCard product={p}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default Shop
