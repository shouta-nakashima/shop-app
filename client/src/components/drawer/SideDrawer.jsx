import React from 'react'
import { Drawer, Button } from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import noImage from '../../image/no_image.png'

const SideDrawer = ({ children }) => {
  const dispatch = useDispatch()
  const {drawer, cart} = useSelector((state) => ({...state}))
  return <Drawer visible={true}>
    {JSON.stringify(cart)}
  </Drawer>
}

export default SideDrawer
