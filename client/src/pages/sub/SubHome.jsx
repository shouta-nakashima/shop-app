import React,{useState, useEffect} from 'react'
import {getSub} from '../../functions/sub'
import { ProductCard } from '../../components/cards/index';
import { Spin } from 'antd';

const SubHome = ({match}) => {
  const [sub, setSub] = useState({})
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const {slug} = match.params

  useEffect(() => {
    setLoading(true)
    getSub(slug)
      .then(res => {
      //console.log(JSON.stringify(res.data, null,4));
      setSub(res.data.sub)
        setProducts(res.data.products)
        setLoading(false)
    })
  }, [])
  
  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className="container-fluid" style={{paddingTop: "70px"}}>
        <div className="row">
          <div className="col">
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length } Products in "{sub.name}" Sub Category
            </h4>
          </div>
        </div>
        <div className="row">
          {products.map((p) =>
            <div className="col-md-4" key={p._id}>
              <ProductCard product={p}/>
            </div>
          )}
        </div>
      </div>
    </Spin>
  )
}

export default SubHome
