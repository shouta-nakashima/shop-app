import React from 'react'
import { Card, Tabs } from 'antd'
import {Link} from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import NoImage from '../../image/no_image.png'
import { ProductListItem } from './index'
import StarRating from 'react-star-ratings'
import RatingModal from '../modal/RatingModal'
import {showAverage} from '../../functions/rating'

const {TabPane} = Tabs

const ProductDetail = ({ product, onStarClick, star }) => {
  const {title, images, description, _id} = product
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
            <>
              <ShoppingCartOutlined className="text-success"/> <br/> カートに追加
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br/> お気に入りに追加
            </Link>,
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
