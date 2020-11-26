import React from 'react'
import { Card} from 'antd'
import { ReadOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import noImages from '../../image/no_image.png'
import { Link } from 'react-router-dom'
import {showAverage} from '../../functions/rating'

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const {title, description, images, slug} = product
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
          <><ShoppingCartOutlined  className="text-danger" /> <br/> カートに追加 </>
        ]}
      >
        <Meta title={title} description={`${ description && description.substring(0, 15)}...`}/>
      </Card>
    </>
  )
}

export default ProductCard
