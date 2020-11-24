import React, {useState, useEffect} from 'react'
import { getProducts } from '../../functions/product'
import ProductCard from '../cards/ProductCard'

const NewItems = ({loading, setLoading}) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    loadAllProducts()
  }, [])
  
  const loadAllProducts = () => {
    setLoading(true)
    getProducts('createdAt','desc', 3)
      .then((res) => {
        setProducts(res.data)
        setLoading(false)
      })
  }
  return (
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4">
              <ProductCard product={ product}/>
            </div>
          ))}
        </div>
      </div>
  )
}

export default NewItems
