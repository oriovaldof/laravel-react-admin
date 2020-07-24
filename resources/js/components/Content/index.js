import React from 'react'
import { Layout as AntLayout } from 'antd'

const contentStyle = {
  margin: '24px 16px',
  padding: 24,
  minHeight: 'calc(100vh - 112px)',
  position: 'relative',
  background: '#fff'
}

function Content (props) {
  const AntContent = AntLayout.Content

  return (
    <AntContent style={{ ...contentStyle }}>
      {props.children}
    </AntContent>
  )
}

export default Content
