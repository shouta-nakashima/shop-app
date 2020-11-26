import React, {useState} from 'react'
import { Spin } from 'antd';
import { Jumbotron } from '../components/cards/index'
import { NewItems, BestSellers } from '../components/home/index'
import CategoryList from '../components/category/CategoryList'

const Home = () => {
  const [loading, setLoading] = useState(false)

  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className="jumbotron text-info h1 font-weight-bold text-center">
        <Jumbotron text={ ['Welcome to SHOP APP','Thanks for coming!!','Have fun slowly']}/>
      </div>
      <h4 className="text-center mt-5 mb-5 p-3 display-3 jumbotron">New Items</h4>
      <NewItems setLoading={setLoading} />
      <br/>
      <h4 className="text-center mt-5 mb-5 p-3 display-3 jumbotron">Best Sellers</h4>
      <BestSellers setLoading={setLoading} />
      <h4 className="text-center mt-5 mb-5 p-3 display-3 jumbotron">All Category</h4>
      <CategoryList setLoading={setLoading}/>
    </Spin>
  )
}

export default Home
