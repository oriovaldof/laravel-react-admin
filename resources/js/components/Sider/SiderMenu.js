/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import styled from 'styled-components'
import {
  HomeOutlined,
  UsergroupAddOutlined,
  WifiOutlined
} from '@ant-design/icons'

import { useAuth } from '@contexts/AuthProvider'
import { ROLES, THEME } from '@variables'
import { useTranslation } from 'react-i18next'
const { SubMenu } = Menu
function SiderMenu() {
  const location = useLocation()
  const { user } = useAuth()
  const { t } = useTranslation('sider')

  const Logo = styled.img.attrs({
    src: '/img/logo.png'
  })`
      max-height: 48px;
      max-width: 100%;
    `

  const LogoContainer = styled.div`
      height: 48px;
      text-align: center;
      margin: 8px;
    `

  const selectedKeys = () => {
    const pathname = location.pathname.replace('/', ':')
    return ['sider' + (pathname === ':' ? ':home' : pathname)]
  }

  return (
    <>
      <LogoContainer><Logo /></LogoContainer>
      <Menu theme={THEME.sider} mode='inline' defaultSelectedKeys={selectedKeys()}>
        <Menu.Item key='sider:home' icon={<HomeOutlined />}>
          <Link to='/'>{t('home')}</Link>
        </Menu.Item>
        <Menu.Item key='sider:safra' icon={<WifiOutlined />}>
          <Link to='/safra'>{t('harvest')}</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<UsergroupAddOutlined />} title="User">
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        {
          user.roles.includes(ROLES.admin)
            ? <Menu.Item key='sider:users' icon={<UsergroupAddOutlined />}>
              <Link to='/users'>{t('users')}</Link>
            </Menu.Item>
            : null
        }
      </Menu>
    </>

  )
}

export default SiderMenu
