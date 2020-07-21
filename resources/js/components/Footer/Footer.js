import React from 'react'
import { Layout as AntLayout } from 'antd'

import { HeartTwoTone } from '@ant-design/icons'

function Footer () {
  const AntFooter = AntLayout.Footer

  return (
    <AntFooter>
      Made with <HeartTwoTone twoToneColor='#eb2f96' /> by <a href='https://github.com/danilocolasso' target='_blank' rel='noreferrer'>Danilo Colasso</a>
    </AntFooter>
  )
}

export default Footer
