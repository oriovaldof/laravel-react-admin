import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import styled from 'styled-components'

function LoadingContent () {
  const LoadingContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `

  return (
    <LoadingContainer>
      <LoadingOutlined />
    </LoadingContainer>
  )
}

export default LoadingContent
