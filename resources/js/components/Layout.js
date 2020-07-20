import React from 'react'
import { Layout as AntLayout } from 'antd'
import Header from './Header/Header'
import Sider from './Sider/Sider'
import Content from './Content/Content'
import Footer from './Footer/Footer'

function Layout(props) {

    return (
        <AntLayout>
            <Sider/>
            <AntLayout className={'site-layout'}>
                <Header user={props.user}/>
                <Content>
                    { props.children }
                </Content>
                 <Footer/>
            </AntLayout>
        </AntLayout>
    )
}

export default Layout
