import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import {
  LogoutOutlined,
  EditOutlined,
  DownCircleOutlined,
  HistoryOutlined,
  UploadOutlined,
  FilePptOutlined,
  OrderedListOutlined,
  AccountBookOutlined,
  UserAddOutlined,
  HeartOutlined,
  AppstoreAddOutlined
} from '@ant-design/icons'
import SubMenu from 'antd/lib/menu/SubMenu';

const { Item } = Menu;

const AdminNav = ({ onClose, logout }) => {
    const handleLogoutClose = () => {
      onClose()
      logout()
    }
  return (
    <Menu mode="inline">
      <h5 className="text-center text-info">Admin Only</h5>
      <Item icon={<HistoryOutlined />} className="nav-item" onClick={onClose}>
        Dashboard
        <Link to="/admin/dashboard" className="nav-link" />
        
      </Item>
      <Item icon={<FilePptOutlined />} className="nav-item" onClick={onClose}>
        All Items
        <Link to="/admin/products" className="nav-link"/>
      </Item>
      <SubMenu icon={<AppstoreAddOutlined />} title="Create Items">
        <Item icon={<UploadOutlined />} className="nav-item" onClick={onClose}>
          Product
          <Link to="/admin/product" className="nav-link"/>
        </Item>
        <Item icon={<OrderedListOutlined />} className="nav-item" onClick={onClose}> 
          Category
          <Link to="/admin/category" className="nav-link"/>
        </Item>
        <Item icon={<DownCircleOutlined />} className="nav-item" onClick={onClose}>
          Sub Category
          <Link to="/admin/sub" className="nav-link"/>
        </Item>
        <Item icon={<AccountBookOutlined />} className="nav-item" onClick={onClose}>
          Coupon
          <Link to="/admin/coupon" className="nav-link"/>
        </Item>
      </SubMenu>
      <hr />
      <h5 className="text-center text-info">Common page</h5>
      <Item icon={<EditOutlined />} className="nav-item" onClick={onClose}>
        Password
        <Link to="/user/password" className="nav-link"/>
      </Item>
      <Item icon={<UserAddOutlined />} className="nav-item" onClick={onClose}>
        UserHistory
        <Link to="/user/history" className="nav-link"/>
      </Item>
      <Item icon={<  HeartOutlined/>} className="nav-item" onClick={onClose}>
        Wishlist
        <Link to="/user/wishlist" className="nav-link"/>
      </Item>
      <Item icon={<LogoutOutlined />} onClick={handleLogoutClose}>Logout</Item>
    </Menu>
  )
}

export default AdminNav
