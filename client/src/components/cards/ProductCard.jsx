import React, {useState} from 'react'
import { Card, Tooltip} from 'antd'
import { ReadOutlined, ShoppingCartOutlined, CloseCircleOutlined } from '@ant-design/icons'
import noImages from '../../assets/image/no_image.png'
import { Link } from 'react-router-dom'
import { showAverage } from '../../functions/rating'
import _ from 'lodash'
import {useDispatch} from 'react-redux'

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState('click to add')
  const dispatch = useDispatch()
  const {title, description, images, slug} = product

  const handleAddToCart = () => {
    
    //create art array
    let cart = []
    if (typeof window !== 'undefined') {
      //cartがlocalStorageにある場合は取得
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      // 新しい商品をcartに追加
      cart.push({
        ...product,
        count: 1
      })
      //重複を削除する
      let unique = _.uniqWith(cart, _.isEqual)
      // localStorageに保存
      //console.log('unique', unique);
      localStorage.setItem('cart', JSON.stringify(unique))
      //show tooltip
      setTooltip('Added')
      dispatch({
        type: "ADD_TO_CART",
        payload: unique
      })
      // show cart item sidedrawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true
      })
    }
  }
  return (
    <>
      {product && product.ratings && product.ratings.length > 0
          ? showAverage(product)
          : <p className="text-center pt-3 pb-3">No Rating</p>}
      <Card
        cover={
          <img
            alt="images"
            src={images && images.length ? images[0].url : noImages}
            style={{ height: '150px', objectFit: 'cover' }}
            className="p-1"
          />
        }

        actions={[
          <Link to={`/product/${slug}`}> 
            <ReadOutlined className="text-info" /> <br/> 詳細ページへ
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={product.quantity < 1}>
              {product.quantity < 1 ? <CloseCircleOutlined className="text-danger"/> : <ShoppingCartOutlined className="text-success" />}
              <br /> 
              {product.quantity < 1 ? <p className="text-danger mb-0">SOLD OUT</p> : "カートに追加"}
            </a>
          </Tooltip>
        ]}
      >
        <Meta title={title} description={`${ description && description.substring(0, 15)}...`}/>
      </Card>
    </>
  )
}

export default ProductCard
