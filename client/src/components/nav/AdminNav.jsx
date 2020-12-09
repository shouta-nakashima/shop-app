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
  AccountBookOutlined
} from '@ant-design/icons'

const { Item } = Menu;

const AdminNav = ({ onClose, logout }) => {
    const handleLogoutClose = () => {
      onClose()
      logout()
    }
  return (
    <Menu>
        <Item icon={<HistoryOutlined />} className="nav-item" onClick={onClose}>
          Dashboard
          <Link to="/admin/dashboard" className="nav-link" />
          
        </Item>
        <Item icon={<UploadOutlined />} className="nav-item" onClick={onClose}>
          Product
          <Link to="/admin/product" className="nav-link"/>
        </Item>
        <Item icon={<FilePptOutlined />} className="nav-item" onClick={onClose}>
          Products
          <Link to="/admin/products" className="nav-link"/>
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
        <Item icon={<EditOutlined />} className="nav-item" onClick={onClose}>
          Password
          <Link to="/user/password" className="nav-link"/>
        </Item>
        <Item icon={<LogoutOutlined />} onClick={handleLogoutClose}>Logout</Item>
    </Menu>
  )
}

export default AdminNav
