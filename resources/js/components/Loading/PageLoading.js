import React from 'react'
import { useTranslation } from 'react-i18next'

function PageLoading () {
  const { t } = useTranslation('common')

  return (
    <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      zIndex: 9
    }}
    >
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        userSelect: 'none',
        cursor: 'default'
      }}
      >
        <span>{t('loading')}...</span>
      </div>
    </div>
  )
}

export default PageLoading
