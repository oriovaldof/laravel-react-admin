import React from 'react'
import { Layout as AntLayout } from 'antd'
import Header from '@components/Header'
import Sider from '@components/Sider'
import Content from '@components/Content'
import Footer from '@components/Footer'

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
