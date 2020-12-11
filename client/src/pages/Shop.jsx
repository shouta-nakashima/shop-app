import React,{useState, useEffect} from 'react'
import { getProductsByCount, fetchProductsByFilter } from '../functions/product'
import {useSelector } from 'react-redux'
import {ProductCard} from '../components/cards/index'
import { Spin, Button, Drawer } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { Search } from '../components/forms/index'
import {Menus} from '../components/shop/index'


const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  }

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
      fetchProducts({ query: text })
      if(!text) {
        loadAllProducts()
      }
    }, 300)
    return () => clearTimeout(delayed)
  },[text])

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg)
      .then((res) => {
        setProducts(res.data)
      })
  }

  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className="container-fluid" style={{paddingTop: "70px", minHeight: "575px"}}>
        <div className="row">
          <div className="col-md-10 offset-md-1 pt-2 ">
            <div className="text-center">
              <h4 className="text-center">検索商品の一覧 </h4>
              <div style={{display: "flex", justifyContent: "center"}}>
                <Button onClick={showDrawer} className="mr-3">条件検索<SearchOutlined /></Button>
                <Search />
              </div>
              <div className="col-md-3 pt-2 text-center">
            </div>
              <Drawer
                placement="left"
                closable={false}
                onClose={onClose}
                visible={visible}
              >
                <Menus
                  fetchProducts={fetchProducts}
                  loadAllProducts={loadAllProducts}
                />
              </Drawer>
            </div>
            {products.length < 1 && <p className="text-center mt-5">該当の商品は見つかりません。</p>}
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
