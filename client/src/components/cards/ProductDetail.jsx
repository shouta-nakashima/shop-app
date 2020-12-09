import React, {useState} from 'react'
import { Card, Tabs,Tooltip } from 'antd'
import { HeartOutlined, ShoppingCartOutlined, CloseCircleOutlined } from '@ant-design/icons'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import NoImage from '../../image/no_image.png'
import { ProductListItem } from './index'
import StarRating from 'react-star-ratings'
import RatingModal from '../modal/RatingModal'
import { showAverage } from '../../functions/rating'
import {addToWishlist} from '../../functions/user'
import _ from 'lodash'
import {useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'

const {TabPane} = Tabs

const ProductDetail = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product
  const [tooltip, setTooltip] = useState('click to add')
  const dispatch = useDispatch()
  const { user} = useSelector((state) => ({ ...state }))
  let history = useHistory()

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

  const handleAddToWishkist = (e) => {
    e.preventDefault()
    addToWishlist(product._id, user.token)
      .then((res) => {
        //console.log('ADD WISHLIST', res.data);
        toast.success('Wishlistに追加しました')
        history.push('/user/wishlist')
      })
  }

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={ i.public_id} alt="images"/>)}
          </Carousel>) : 
          <Card cover={<img alt="images" src={NoImage} className="mb-3 card-image" />}></Card>
        }
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
          この製品の詳細については、XXXX-XXXX-XXXX までお電話ください。
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {product && product.ratings && product.ratings.length > 0
          ? showAverage(product)
          : <p className="text-center pt-3 pb-3">No Rating</p>}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                {product.quantity < 1
                  ? <CloseCircleOutlined className="text-danger" />
                  : <ShoppingCartOutlined className="text-success" />
                }
                <br /> 
                {product.quantity < 1
                  ? <p className="text-danger mb-0">SOLD OUT</p>
                  : "カートに追加"
                }
              </a>
            </Tooltip>,
            <a onClick={handleAddToWishkist}>
              <HeartOutlined className="text-info" /> <br/> お気に入りに追加
            </a>,
            <RatingModal>
              <StarRating
                starHoverColor="skyBlue"
                starRatedColor="orange"
                name={_id}
                numberOfStars={5}
                changeRating={onStarClick}
                rating={star}
                isSelectable={true}
              />
            </RatingModal>
          ]}
        >
          <ProductListItem product={ product}/>
        </Card>
      </div>
    </>
  )
}

export default ProductDetail
