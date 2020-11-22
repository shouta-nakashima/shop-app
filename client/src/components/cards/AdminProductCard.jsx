import React from 'react'
import { Card } from 'antd';
import noImages from '../../image/no_image.png'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const {title, description, images, slug} = product
  return (
    <Card
      cover={
        <img
          alt="images"
          src={images && images.length ? images[0].url : noImages}
          style={{ height: '150px', objectFit: 'cover' }}
          className="p-1"
        />
      }
      actions={[<EditOutlined className="text-info"/>, <DeleteOutlined onClick={() => handleRemove(slug)} className="text-danger"/>]}
    >
      <Meta title={title} description={`${ description && description.substring(0, 40)}...`}/>
    </Card>
  )
}

export default AdminProductCard
