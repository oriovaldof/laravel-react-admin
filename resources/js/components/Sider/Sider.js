/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react'
import { Layout as AntLayout, Drawer } from 'antd'
import SiderMenu from '@components/Sider/SiderMenu'

import { appContext } from '@contexts/AppProvider'
import { THEME } from '@variables'

function Sider () {
  const AntSider = AntLayout.Sider
  const [drawer, setDrawer] = useState(false)
  const { collapsed } = appContext()

  const drawerProps = {
    placement: 'left',
    closable: false,
    onClose: () => collapsed.toggle(),
    visible: (drawer && !collapsed.get),
    bodyStyle: { padding: 0 },
    drawerStyle: THEME.sider === 'dark' ? {
      color: 'rgba(255, 255, 255, 0.65)',
      background: '#001529'
    } : ''
  }

  const siderProps = {
    trigger: null,
    collapsible: true,
    collapsed: collapsed.get,
    theme: THEME.sider,
    breakpoint: 'lg',
    onBreakpoint: broken => { setDrawer(broken) },
    style: drawer ? { display: 'none' } : {}
  }

  return (
    <AntSider {...siderProps}>
      <SiderMenu />
      <Drawer {...drawerProps}><SiderMenu /></Drawer>
    </AntSider>
  )
}

export default Sider
