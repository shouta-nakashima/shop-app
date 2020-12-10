import React, {useState} from 'react'
import { Menu, Badge, Drawer, Layout } from 'antd';
import {
  AppstoreOutlined,
  UserOutlined,
  UserAddOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import {auth} from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import {AdminNav, UserNav} from './index'

const { Item } = Menu;//Menu.SubMenu

const {Header} = Layout

const NavHeader = () => {
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
    <Header  style={{ position: 'fixed', zIndex: 1, width: '100%', paddingRight: 0, paddingLeft: 0 }}>
      <Menu theme="dark" className="container-fluid" onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        {user && (
            <Item className="text-white" onClick={showDrawer} key="menu" icon={<MenuOutlined />} >
              Menu
            </Item>
        )}
        <Item className="text-white" key="home" icon={<AppstoreOutlined />}>
          <Link className="text-white" to="/">Home</Link>
        </Item>

        <Item className="text-white" key="shop" icon={<ShoppingOutlined/>}>
          <Link className="text-white" to="/shop">Shop</Link>
        </Item>

        <Item className="text-white" key="cart" icon={<ShoppingCartOutlined/>}>
          <Link to="/cart">
            <Badge count={cart.length} offset={[9,0]}>
              <p className="text-white"> Cart</p>
            </Badge>
          </Link>
        </Item>

        {!user && (
          <Item className="text-white float-right" key="register" icon={<UserAddOutlined />} >
            <Link className="text-white" to="/register">Sign Up</Link>
          </Item>
        )}

        {!user && (
          <Item className="text-white float-right" key="login" icon={<UserOutlined />} >
            <Link className="text-white" to="/login">Login</Link>
          </Item>
        )}
      </Menu>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {user && user.role === "admin" ? <AdminNav onClose={onClose} logout={ logout}/> : <UserNav onClose={onClose} logout={ logout} />}
      </Drawer>
    </Header>
  )
}

export default NavHeader
