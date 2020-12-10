import React, {useState} from 'react'
import { Spin } from 'antd';
import { Jumbotron } from '../components/cards/index'
import { NewItems, BestSellers } from '../components/home/index'
import CategoryList from '../components/category/CategoryList'
import SubList from '../components/sub/SubList'

const Home = () => {
  const [loading, setLoading] = useState(false)

  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className="container-fluid" style={{paddingTop: "70px", minHeight: "575px"}}>
        <div className="jumbotron text-info h1 font-weight-bold text-center">
          <Jumbotron text={ ['Thanks for coming!!',"Nakaji's SHOP APP",'This is a Demo site']}/>
        </div>
        <h4 className="text-center mt-5 mb-5 p-3 display-3 jumbotron">New Items</h4>
        <NewItems setLoading={setLoading} />
        <br/>
        <h4 className="text-center mt-5 mb-5 p-3 display-3 jumbotron">Best Sellers</h4>
        <BestSellers setLoading={setLoading} />
        <h4 className="text-center mt-5 mb-5 p-3 display-3 jumbotron">Category</h4>
        <CategoryList setLoading={setLoading} />
        <h4 className="text-center mt-5 mb-5 p-3 display-3 jumbotron">Sub Category</h4>
        <SubList setLoading={setLoading} />
      </div>
    </Spin>
  )
}

export default Home
