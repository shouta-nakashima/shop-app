import React,{useState, useEffect} from 'react'
import { getProductsByCount, fetchProductsByFilter } from '../functions/product'
import {getCategories} from '../functions/category'
import {useSelector, useDispatch} from 'react-redux'
import {ProductCard} from '../components/cards/index'
import { Spin, Menu, Slider, Checkbox } from 'antd';
import { DollarCircleOutlined, DownSquareOutlined,StarOutlined } from '@ant-design/icons'
import {Star} from '../components/forms/index'


const {SubMenu,ItemGroup} = Menu

const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState([0, 0])
  const [ok, setOk] = useState(false)
  const [categories, setCategories] = useState([])
  const [categoryIds, setCategoryIds] = useState([])
  const [star, setStar] = useState('')

  let dispatch = useDispatch()
  let {search} = useSelector((state) => ({...state}))
  const {text} = search

  useEffect(() => {
    loadAllProducts()
    //fetch categories
    getCategories().then((res) => setCategories(res.data))
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
    setStar("")
    setCategoryIds([])
    setPrice(value)
    setTimeout(() => {
      setOk(!ok)
    },300)
  }

  //4 category に基づいて製品をload
  const showCategories = () => categories.map((c) =>
    <div key={c._id}>
      <Checkbox
        onChange={handleCheck} 
        className="pb-2 pl-4 pr-4"
        value={c._id}
        name="category"
        checked={categoryIds.includes(c._id)}
      >
        {c.name}
      </Checkbox>
      <br/>
    </div>
  )

  const handleCheck = e => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: {text: ""}
    })
    setPrice([0,0])
    setStar("")
    //console.log(e.target.value);
    let inTheState = [...categoryIds]
    let justChecked = e.target.value
    let foundInTheState = inTheState.indexOf(justChecked) //index or -1

    //indexOf? 見つからない場合は-1を返し、そうでない場合はインデックスを返す
    if (foundInTheState === -1) {
      inTheState.push(justChecked)
    } else {
      // 見つかった場合は、インデックスから1つのアイテムを引き出す
      inTheState.splice(foundInTheState, 1)
    }
    setCategoryIds(inTheState)
    //console.log(inTheState);
    fetchProducts({category: inTheState})
  }

  //5 star ratingで商品を表示
  const handleStarClick = (num) => {
    //console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: {text: ""}
    })
    setPrice([0,0])
    setCategoryIds([])
    setStar(num)
    fetchProducts({stars: num})
  }
  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} /><br/>
      <Star starClick={handleStarClick} numberOfStars={4} /><br/>
      <Star starClick={handleStarClick} numberOfStars={3} /><br/>
      <Star starClick={handleStarClick} numberOfStars={2} /><br/>
      <Star starClick={handleStarClick} numberOfStars={1}/>
    </div>
  )


  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 pt-2 text-center">
            <h4>Search&Filter</h4>
            <hr/>
            <Menu mode="inline" defaultOpenKeys={["1", "2","3"]}>
              {/* price */}
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
                    tipFormatter={(v) => `${v.toLocaleString()}円`}
                    range
                    value={price}
                    onChange={handleSlider}
                    max="300000"
                  />
                </div>
              </SubMenu>
              {/* categories */}
              <SubMenu
                key="2"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Category
                  </span>
                }
              >
                <div>
                  {showCategories()}
                </div>
              </SubMenu>

              {/* stars */}
              <SubMenu
                key="3"
                title={
                  <span className="h6">
                    <StarOutlined /> Rating
                  </span>
                }
              >
                <div>
                  {showStars()}
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
