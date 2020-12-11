import React, { useState, useEffect } from 'react'
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
            ok={ok}
            setStar={setStar}
            setBrand={setBrand}
            setCategoryIds={setCategoryIds}
            setSub={setSub}
            setColor={setColor}
            setShipping={setShipping}
            setPrice={setPrice}
            setOk={setOk}
            fetchProducts={fetchProducts}
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
            fetchProducts={fetchProducts}
            setStar={setStar}
            setBrand={setBrand}
            setCategoryIds={setCategoryIds}
            setSub={setSub}
            setColor={setColor}
            setShipping={setShipping}
            setPrice={setPrice}
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
            fetchProducts={fetchProducts}
            setStar={setStar}
            setBrand={setBrand}
            setCategoryIds={setCategoryIds}
            setSub={setSub}
            setColor={setColor}
            setShipping={setShipping}
            setPrice={setPrice}
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
            fetchProducts={fetchProducts}
            setStar={setStar}
            setBrand={setBrand}
            setCategoryIds={setCategoryIds}
            setSub={setSub}
            setColor={setColor}
            setShipping={setShipping}
            setPrice={setPrice}
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
            fetchProducts={fetchProducts}
            setStar={setStar}
            setBrand={setBrand}
            setCategoryIds={setCategoryIds}
            setSub={setSub}
            setColor={setColor}
            setShipping={setShipping}
            setPrice={setPrice}
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
            fetchProducts={fetchProducts}
            setStar={setStar}
            setBrand={setBrand}
            setCategoryIds={setCategoryIds}
            setSub={setSub}
            setColor={setColor}
            setShipping={setShipping}
            setPrice={setPrice}
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
            fetchProducts={fetchProducts}
            setStar={setStar}
            setBrand={setBrand}
            setCategoryIds={setCategoryIds}
            setSub={setSub}
            setColor={setColor}
            setShipping={setShipping}
            setPrice={setPrice}
          />
        </div>
      </SubMenu>
    </Menu>
  )
}

export default Menus
