import React, {useState} from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import {auth} from '../../firebase'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

const { SubMenu, Item } = Menu;//Menu.SubMenu

const Header = () => {
  let dispatch = useDispatch()
  let history = useHistory()
  const [current, setCurrent] = useState('home')
  
  const handleClick = (e) => {
    setCurrent(e.key)
  }

  const logout = () => {
    auth.signOut()
    dispatch({
      type: "LOGOUT",
      payload: null
    })
    toast.warn("ログアウトしました。")
    history.push('/login')
  }
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item key="register" icon={<UserAddOutlined />} className="float-right">
        <Link to="/register">Sign Up</Link>
      </Item>

      <Item key="login" icon={<UserOutlined />} className="float-right">
        <Link to="/login">Login</Link>
      </Item>
      
      <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username">
          <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
        <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
      </SubMenu>
    </Menu>
  )
}

export default Header
