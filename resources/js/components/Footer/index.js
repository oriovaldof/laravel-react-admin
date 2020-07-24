import React from 'react'
import { Layout as AntLayout } from 'antd'

import { HeartTwoTone } from '@ant-design/icons'
import { Trans, useTranslation } from 'react-i18next'

function Footer () {
  const AntFooter = AntLayout.Footer
  const { t } = useTranslation('footer')

  return (
    <AntFooter>
      <Trans
        t={t}
        i18nKey='made-with-love'
        components={{
          heart: <HeartTwoTone twoToneColor='#eb2f96' />
        }}
      />
      <a href='https://github.com/danilocolasso' target='_blank' rel='noreferrer'>Danilo Colasso</a>
    </AntFooter>
  )
}

export default Footer
