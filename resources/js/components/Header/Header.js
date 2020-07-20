import React from 'react'
import { withRouter, useHistory, Link, useLocation } from 'react-router-dom'
import { Layout as AntLayout, Menu, Avatar, message } from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    LogoutOutlined,
    ProfileOutlined
} from '@ant-design/icons'

import { useAuth } from '../../contexts/AuthProvider'
import { appContext } from '../../contexts/AppProvider'

function Header(props) {
    const AntHeader = AntLayout.Header

    const location = useLocation()
    const { collapsed } = appContext()
    const nameLimit = 10

    const { user, logout } = useAuth()
    const history = useHistory()

    const handleLogout = () => {
        logout().then(response => {
            if(response.data.status === 'success') {
                message.success(response.data.message)
                history.push('/login')
            } else {
                message.error(response.data.message)
            }
        })
    }

    const selectedKeys = () => {
        let pathname = location.pathname.replace('/', ':')
        return [ 'header' + pathname ]
      }

    const avatar = (
        <Avatar icon={<UserOutlined />} style={{ marginRight: '10px' }}/>
    )

    return (
        <AntHeader className="site-layout-background" style={{ padding: 0 }}>
            <Menu theme="light" mode="horizontal" selectable={false} triggerSubMenuAction={'click'} defaultSelectedKeys={selectedKeys()}>
                <Menu.Item key="0">
                {
                    React.createElement(collapsed.get ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'sider-trigger',
                        onClick: collapsed.toggle,
                    }
                )}
                </Menu.Item>
                <Menu.SubMenu icon={avatar} title={ user.name.substring(0, nameLimit) + (user.name.length > nameLimit ? '...' : '') } style={{ float: 'right' }}>
                    <Menu.Item key="header:profile" icon={<ProfileOutlined/>}><Link to={'/profile'}>Perfil</Link></Menu.Item>
                    <Menu.Item key="header:logout" onClick={handleLogout} icon={<LogoutOutlined/>}>Logout</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </AntHeader>
    )
}

export default withRouter(Header)
