import React from 'react'
import { Card } from 'antd'
import {Link} from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'

const { Meta } = Card;

const ProductDetail = ({ product }) => {
  const {title, description, images, slug} = product
  return (
    <>
      <div className="col-md-7">
        images
      </div>
      <div className="col-md-5">
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
          <Meta title={title} description={ description}/>
        </Card>
      </div>
    </>
  )
}

export default ProductDetail
