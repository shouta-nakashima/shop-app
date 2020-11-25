import React from 'react'
import { Card } from 'antd'
import {Link} from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import NoImage from '../../image/no_image.png'
import {ProductListItem} from './index'

const ProductDetail = ({ product }) => {
  const {title, images} = product
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={ i.public_id} alt="images"/>)}
          </Carousel>) : 
          <Card cover={<img alt="images" src={NoImage} className="mb-3 card-image" />}></Card>
        }
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{ title}</h1>
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
