import React,{useEffect, useState} from 'react'
import {AdminNav} from '../../../components/nav/index'
import { getProductsByCount } from '../../../functions/product'
import { Spin } from 'antd';
import AdminProductCard from '../../../components/cards/AdminProductCard'

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAllProducts()
  },[])

  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className ="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav/>
          </div>
          <div className="col">
            <h4 className="text-center pt-3 pb-3">All Products</h4>
            <div className="row">
              {products.map(product =>
                <div className="col-md-4 pb-3" key={product._id}>
                  <AdminProductCard product={product} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default AllProducts
