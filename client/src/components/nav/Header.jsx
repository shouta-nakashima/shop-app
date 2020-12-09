import React, {useState} from 'react'
import { Menu, Badge, Drawer } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import {auth} from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Search } from '../forms/index'
import {AdminNav, UserNav} from './index'

const { SubMenu, Item } = Menu;//Menu.SubMenu

const Header = () => {
  let dispatch = useDispatch()
  let {user, cart} = useSelector((state) => ({...state}))
  let history = useHistory()
  const [current, setCurrent] = useState('home')
  const [visible, setVisible] = useState(false)
  
  const handleClick = (e) => {
    setCurrent(e.key)
  }

  const logout = () => {
    auth.signOut()
    dispatch({
      type: "LOGOUT",
      payload: null
    })
    toast.warn("👋ログアウトしました。")
    history.push('/login')
  }

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Menu className="container-fluid" onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        {user && (
            <Item onClick={showDrawer} key="menu" icon={<MenuOutlined />} >
              Menu
            </Item>
        )}
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Item>

        <Item key="shop" icon={<ShoppingOutlined/>}>
          <Link to="/shop">Shop</Link>
        </Item>

        <Item key="cart" icon={<ShoppingCartOutlined/>}>
          <Link to="/cart">
            <Badge count={cart.length} offset={[9,0]}>
              Cart
            </Badge>
          </Link>
        </Item>

        {!user && (
          <Item key="register" icon={<UserAddOutlined />} className="float-right">
            <Link to="/register">Sign Up</Link>
          </Item>
        )}

        {!user && (
          <Item key="login" icon={<UserOutlined />} className="float-right">
            <Link to="/login">Login</Link>
          </Item>
        )}
        
        {user && (
          <SubMenu key="SubMenu" icon={<UserOutlined />} title={user.email && user.email.split('@')[0]} className="float-right"/>
        )}
        <span className="float-right p-1">
          <Search/>
        </span>
      </Menu>
      <Drawer
        title={user && user.role === "admin" ? "ADMIN MENU" : "User Menu"}
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {user && user.role === "admin" ? <AdminNav onClose={onClose} logout={ logout}/> : <UserNav onClose={onClose} logout={ logout} />}
      </Drawer>
    </>
  )
}

export default Header
