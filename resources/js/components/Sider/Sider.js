/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout as AntLayout, Menu } from 'antd'
import styled from 'styled-components'
import {
  HomeOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons'

import { appContext } from '~/contexts/AppProvider'
import { useAuth } from '~/contexts/AuthProvider'
import { ROLES } from '~/variables'
import { useTranslation } from 'react-i18next'

function Sider (props) {
  const AntSider = AntLayout.Sider

  const location = useLocation()
  const { user } = useAuth()
  const { collapsed } = appContext()
  const { t } = useTranslation('sider')

  const Logo = styled.img.attrs({
    src: '/img/logo.png'
  })`
      max-height: 48px;
      max-width: 100%;
    `

  const LogoContainer = styled.div`
      height: 48px;
      /* background: rgba(255, 255, 255, 0.2); */
      text-align: center;
      margin: 8px;
    `

  const selectedKeys = () => {
    const pathname = location.pathname.replace('/', ':')
    return ['sider' + (pathname === ':' ? ':home' : pathname)]
  }

  return (
    <AntSider trigger={null} collapsible collapsed={collapsed.get}>
      <LogoContainer><Logo /></LogoContainer>
      <Menu theme='dark' mode='inline' defaultSelectedKeys={selectedKeys()}>
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
    </AntSider>
  )
}

export default Sider
