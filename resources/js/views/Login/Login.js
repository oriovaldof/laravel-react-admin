import React, { useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { Form, Input, Button, Checkbox, message, Layout, Card, Col, Row } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { useAuth } from '@contexts/AuthProvider'

import { Trans, useTranslation } from 'react-i18next'

const buttonStyle = {
  width: '100%'
}

const forgotStyle = {
  float: 'right'
}

function Login () {
  const history = useHistory()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('login')

  const onFinish = values => {
    setLoading(true)

    login(values).then(response => {
      if (response.data.status !== 'success') {
        setLoading(false)
        message.error(response.data.message)
      }

      history.push('/')
    })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Layout>
      <Row gutter={8} type='flex' justify='center' align='middle' style={{ minHeight: '100vh' }}>
        <Col xs={{ span: 18 }} sm={{ span: 6 }} md={{ span: 5 }} style={{ maxWidth: '300px' }}>
          <Card title={t('title')} bordered={false}>
            <Form
              name='login-form'
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name='email'
                rules={[
                  {
                    required: true,
                    message: t('input.email.error.required')
                  }
                ]}
              >
                <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder={t('input.email.label')} />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: t('input.password.error.required')
                  }
                ]}
              >
                <Input
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder={t('input.password.label')}
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox>{t('remember-me')}</Checkbox>
                </Form.Item>

                <a style={{ ...forgotStyle }} href=''>
                  {t('forgot-password')}
                </a>
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit' id='form-submit' loading={loading} style={{ ...buttonStyle }}>
                  {t('login')}
                </Button>
                <Trans t={t} i18nKey='register' components={{ a: <a href='' /> }} />
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}

export default withRouter(Login)
