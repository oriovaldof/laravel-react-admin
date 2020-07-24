import React from 'react'
import { Layout as AntLayout } from 'antd'
import Header from '@components/Header/Header'
import Sider from '@components/Sider/Sider'
import Content from '@components/Content/Content'
import Footer from '@components/Footer/Footer'

function Layout (props) {
  return (
    <AntLayout>
      <Sider />
      <AntLayout>
        <Header />
        <Content>
          {props.children}
        </Content>
        <Footer />
      </AntLayout>
    </AntLayout>
  )
}

export default Layout
