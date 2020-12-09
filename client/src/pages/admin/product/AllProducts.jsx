import React,{useEffect, useState} from 'react'
import { getProductsByCount } from '../../../functions/product'
import { Spin } from 'antd';
import AdminProductCard from '../../../components/cards/AdminProductCard'
import {removeProduct} from '../../../functions/product'
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux'

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const {user} = useSelector((state) => ({...state}))

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

  const handleRemove = (slug) => {
    //let answer = window.confirm('削除しますか？')
    if (window.confirm('削除しますか？')) {
      //console.log('delete product', slug);
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts()
          toast.error(`${res.data.title}を削除しました。`)
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) {
            setLoading(false)
            toast.error(err.response.data);
          }
        })
    }
  }
  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className ="container-fluid">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <h4 className="text-center pt-3 pb-3">All Products</h4>
            <div className="row">
              {products.map(product =>
                <div className="col-md-4 pb-3" key={product._id}>
                  <AdminProductCard product={product} handleRemove={ handleRemove}/>
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
