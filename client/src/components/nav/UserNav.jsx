import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import { LogoutOutlined, EditOutlined, HeartOutlined, HistoryOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

const { Item } = Menu;

const UserNav = ({ onClose, logout }) => {
  let { user } = useSelector((state) => ({ ...state }))
  
  const handleLogoutClose = () => {
    onClose()
    logout()
  }
  return (
    <Menu>
      <h5>{user && user.email && user.email.split('@')[0]}</h5>
      <hr/>
      <Item icon={<HistoryOutlined />} className="nav-item" onClick={onClose}>
        History
        <Link to="/user/history" className="nav-link"/>
      </Item>
      <Item icon={<EditOutlined />} className="nav-item" onClick={onClose}>
        Password
        <Link to="/user/password" className="nav-link"/>
      </Item>
      <Item icon={<HeartOutlined />} className="nav-item" onClick={onClose}>
        WishList
        <Link to="/user/Wishlist"/>
      </Item>
      <Item icon={<LogoutOutlined />} onClick={handleLogoutClose}>Logout</Item>
    </Menu>
  )
}

export default UserNav
