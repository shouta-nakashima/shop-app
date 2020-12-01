import React from 'react'
import { Drawer, Button } from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import noImage from '../../image/no_image.png'

const SideDrawer = () => {
  const dispatch = useDispatch()
  const {drawer, cart} = useSelector((state) => ({...state}))

  const imageStyle = {
    width: '100%',
    height: '50px',
    objectFit: 'cover'
  }

  return (
    <Drawer
      className="text-center"
      title={"カート内容"}
      placement="right"
      closable={false}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false
        })
      }}
      visible={drawer}
    >
      <p>現在{cart.length}つの商品があります。</p>
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images[0]
              ? (
                <>
                  <img src={p.images[0].url} alt="item-images" style={imageStyle} />
                  <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
                </>
              )
              : (
                <>
                  <img src={noImage} alt="no-images" style={imageStyle} />
                  <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
                </>
              )
            }
          </div>
        </div>
      ))}
      <Link to="/cart">
        <Button
          className="text-center btn btn-primary btn-raised btn-block"
          onClick={() => 
            dispatch({
            type: "SET_VISIBLE",
            payload: false
            })
          }
        >
          カートへ
        </Button>
      </Link>
    </Drawer>
  )
}

export default SideDrawer
