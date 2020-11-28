import React,{useState, useEffect} from 'react'
import { getProductsByCount,fetchProductsByFilter } from '../functions/product'
import {useSelector, useDispatch} from 'react-redux'
import {ProductCard} from '../components/cards/index'
import { Spin, Menu, Slider } from 'antd';
import {DollarCircleOutlined} from '@ant-design/icons'


const {SubMenu,ItemGroup} = Menu

const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState([0, 0])
  const [ok, setOk] = useState(false)

  let dispatch = useDispatch()
  let {search} = useSelector((state) => ({...state}))
  const {text} = search

  useEffect(() => {
    loadAllProducts()
  },[])

  //1 デフォルトの検索入力で商品を読み込む
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data)
      setLoading(false)
    })
  }

  //2 ユーザー検索入力に製品をロードする
  useEffect(() => {
    //console.log(text);
    const delayed = setTimeout(() => {
      fetchProducts({query: text})
    }, 300)
    return () => clearTimeout(delayed)
  },[text])

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg)
      .then((res) => {
        setProducts(res.data)
      })
  }

  //3 priceに基づいて製品をload
  useEffect(() => {
    //console.log('price response');
    fetchProducts({price})
  },[ok])

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: {text: ""}
    })
    setPrice(value)
    setTimeout(() => {
      setOk(!ok)
    },300)
  }

  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 pt-2 text-center">
            <h4>Search&Filter</h4>
            <hr/>
            <Menu mode="inline" defaultOpenKeys={["1","2"]}>
              <SubMenu
                key="1"
                title={
                  <span className="h6">
                    <DollarCircleOutlined /> Price
                  </span>
                }
              >
                <div>
                  <Slider
                    className="ml-4 mr-4"
                    tipFormatter={(v) => `${v}円`}
                    range
                    value={price}
                    onChange={handleSlider}
                    max="300000"
                  />
                </div>
              </SubMenu>
            </Menu>
          </div>
          <div className="col-md-9 pt-2">
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
