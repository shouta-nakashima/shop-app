import React from 'react'
import { Card, Tabs } from 'antd'
import {Link} from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import NoImage from '../../image/no_image.png'
import { ProductListItem } from './index'
import StarRating from 'react-star-ratings'

const {TabPane} = Tabs

const ProductDetail = ({ product }) => {
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
        <StarRating
          name={_id}
          numberOfStars={5}
          rating={2}
          changeRating={(newRating, name) => (console.log('newRating', newRating, 'name', name))}
          isSelectable={true}
        />
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success"/> <br/> カートに追加
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br/> お気に入りに追加
            </Link>
          ]}
        >
          <ProductListItem product={ product}/>
        </Card>
      </div>
    </>
  )
}

export default ProductDetail
