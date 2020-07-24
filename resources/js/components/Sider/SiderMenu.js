/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import styled from 'styled-components'
import {
  HomeOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons'

import { useAuth } from '@contexts/AuthProvider'
import { ROLES, THEME } from '@variables'
import { useTranslation } from 'react-i18next'

function SiderMenu () {
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
