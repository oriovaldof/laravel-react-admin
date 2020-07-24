import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import styled from 'styled-components'

function Loading () {
  const LoadingContainer = styled.div`
    background-color: rgba(0,0,0,0.6);
    color: #fff;
    position: fixed;
    z-index: 9999;
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

export default Loading
