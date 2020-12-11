import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCategories } from '../../functions/category'
import {getSubs} from '../../functions/sub'
import { Menu } from 'antd'
import {
  DollarCircleOutlined,
  DownSquareOutlined,
  StarOutlined,
} from '@ant-design/icons'
import {
  PriceSearch,
  CategoriesSearch,
  StarSearch,
  SubsSearch,
  BrandsSearch,
  ColorSearch,
  ShippingSearch
} from './index'

const {SubMenu} = Menu

const Menus = ({fetchProducts, loadAllProducts}) => {
  let dispatch = useDispatch()
  const [price, setPrice] = useState([0, 0])
  const [categories, setCategories] = useState([])
  const [categoryIds, setCategoryIds] = useState([])
  const [star, setStar] = useState('')
  const [subs, setSubs] = useState([])
  const [sub, setSub] = useState('')
  const [brands, setBrands] = useState(["Apple", "Samsung", "Microsoft", "Lenovo", "Dell"])
  const [brand, setBrand] = useState('')
  const [colors, setColors] = useState(["Black","Brown","White","Silver","Blue"])
  const [color, setColor] = useState('')
  const [shipping, setShipping] = useState('')
  const [ok, setOk] = useState(false)

  useEffect(() => {
    loadAllProducts()
    //fetch categories
    getCategories().then((res) => setCategories(res.data))
    //fetch sub category
    getSubs().then((res) => setSubs(res.data))
  },[])

  // priceに基づいて製品をload
  useEffect(() => {
    //console.log('price response');
    fetchProducts({price})
  }, [ok])
  
  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: {text: ""}
    })
    setStar("")
    setBrand("")
    setCategoryIds([])
    setSub('')
    setColor('')
    setShipping('')
    setPrice(value)
    setTimeout(() => {
      setOk(!ok)
    },300)
  }

  // category に基づいて製品をload
  const handleCheck = e => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: {text: ""}
    })
    setPrice([0,0])
    setStar("")
    setSub('')
    setBrand("")
    setColor('')
    setShipping('')
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
    setSub('')
    setStar(num)
    setBrand("")
    setColor('')
    setShipping('')
    fetchProducts({stars: num})
  }
  
  //6 sub category に基づいて商品を表示
  
  const handleSubs = (sub) => {
    //console.log(sub);
    setSub(sub)
    dispatch({
      type: "SEARCH_QUERY",
      payload: {text: ""}
    })
    setPrice([0,0])
    setCategoryIds([])
    setStar('')
    setBrand("")
    setColor('')
    setShipping('')
    fetchProducts({sub: sub})
  }

  // 7 brandに基づいて商品を表示

  const handleBrand = (e) => {
    setSub('')
    dispatch({
      type: "SEARCH_QUERY",
      payload: {text: ""}
    })
    setPrice([0,0])
    setCategoryIds([])
    setStar('')
    setColor('')
    setShipping('')
    setBrand(e.target.value)
    fetchProducts({brand: e.target.value})
  }

  // 8 colorに基づいて商品を表示

  const handleColor = (e) => {
    setSub('')
    dispatch({
      type: "SEARCH_QUERY",
      payload: {text: ""}
    })
    setPrice([0,0])
    setCategoryIds([])
    setStar('')
    setBrand('')
    setShipping('')
    setColor(e.target.value)
    fetchProducts({color: e.target.value})
  }

  //9 shippingに基づいて商品を表示
  
  const handleShippingChange = (e) => {
    setSub('')
    dispatch({
      type: "SEARCH_QUERY",
      payload: {text: ""}
    })
    setPrice([0,0])
    setCategoryIds([])
    setStar('')
    setBrand('')
    setColor('')
    setShipping(e.target.value)
    fetchProducts({shipping: e.target.value})
  }


  return (
    <Menu mode="inline" >
      {/* price */}
      <SubMenu
        title={
          <span className="h6">
            <DollarCircleOutlined /> 金額で探す
          </span>
        }
      >
        <div>
        <PriceSearch
          price={price}
          handleSlider={handleSlider}
        />
        </div>
      </SubMenu>
      {/* categories */}
      <SubMenu
        title={
          <span className="h6">
            <DownSquareOutlined /> カテゴリー
          </span>
        }
      >
        <div>
          <CategoriesSearch
            categories={categories}
            categoryIds={categoryIds}
            handleCheck={handleCheck}
          />
        </div>
      </SubMenu>

      {/* stars */}
      <SubMenu
        title={
          <span className="h6">
            <StarOutlined /> 評価
          </span>
        }
      >
        <div>
          <StarSearch
            handleStarClick={handleStarClick}
          />
        </div>
      </SubMenu>

      {/* sub category */}
      <SubMenu
        title={
          <span className="h6">
            <DownSquareOutlined /> 詳細カテゴリー
          </span>
        }
      >
        <div className="pl-4 pr-4">
          <SubsSearch
            subs={subs}
            handleSubs={handleSubs}
          />
        </div>
      </SubMenu>

      {/* brands */}
      <SubMenu
        key="5"
        title={
          <span className="h6">
            <DownSquareOutlined /> ブランドから選ぶ
          </span>
        }
      >
        <div className="pl-4 pr-4">
          <BrandsSearch
            brand={brand}
            brands={brands}
            handleBrand={handleBrand}
          />
        </div>
      </SubMenu>

      {/* color */}
      <SubMenu
        key="6"
        title={
          <span className="h6">
            <DownSquareOutlined /> 色から選ぶ
          </span>
        }
      >
        <div className="pl-4 pr-4">
          <ColorSearch
            color={color}
            colors={colors}
            handleColor={handleColor}
          />
        </div>
      </SubMenu>

      {/* shipping */}
      <SubMenu
        key="7"
        title={
          <span className="h6">
            <DownSquareOutlined /> 配送可能/店舗受取
          </span>
        }
      >
        <div className="pl-4 pr-4">
          <ShippingSearch
            shipping={shipping}
            handleShippingChange={handleShippingChange}
          />
        </div>
      </SubMenu>
    </Menu>
  )
}

export default Menus
