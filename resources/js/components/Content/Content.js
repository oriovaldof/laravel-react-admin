import React from 'react'
import { Layout as AntLayout } from 'antd'

function Content (props) {
  const AntContent = AntLayout.Content

  return (
    <AntContent
      className='site-layout-background'
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 'calc(100vh - 112px)',
        position: 'relative',
        background: '#fff'
      }}
    >
      {props.children}
    </AntContent>
  )
}

export default Content
