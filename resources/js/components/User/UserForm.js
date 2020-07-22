/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-template-curly-in-string */
import React, { useEffect } from 'react'

import { Form, Input, Select, Button } from 'antd'
import { useTranslation } from 'react-i18next'

import { ROLES } from '~/variables'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}

function UserForm ({ user, onFinish, form }) {
  const { Option } = Select
  const { t } = useTranslation('user')

  const validateMessages = {
    required: t('error.required', { label: '${label}' }),
    types: {
      email: t('error.types.email')
    }
  }

  const confirPassword = ({ getFieldValue }) => ({
    validator (rule, value) {
      if ((!getFieldValue('password') && !value) || getFieldValue('password') === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(t('error.password-confirmation')))
    }
  })

  useEffect(() => {
    if (form) {
      form.resetFields()
    }
  }, [user])

  return (
    <Form {...layout} validateMessages={validateMessages} onFinish={onFinish} initialValues={user ? { ...user } : {}} form={form}>
      <Form.Item
        name='name'
        label={t('name')}
        rules={[{ required: true }]}
      >
        <Input minLength={3} maxLength={40} />
      </Form.Item>

      <Form.Item
        name='email'
        label={t('email')}
        rules={[{ required: true, type: 'email' }]}
      >
        <Input disabled={!!user} />
      </Form.Item>

      <Form.Item
        name='password'
        label={t('password')}
        rules={[(user ? {} : { required: true })]}
      >
        <Input.Password placeholder='********' minLength={6} maxLength={16} />
      </Form.Item>

      <Form.Item
        name='password_confirmation'
        label={t('password-confirmation')}
        rules={[
          (user ? {} : { required: true }),
          confirPassword
        ]}
      >
        <Input.Password placeholder='********' minLength={6} maxLength={16} />
      </Form.Item>

      {
        !form ? null
          : <Form.Item name='roles' label={t('role.label')} rules={[{ required: true }]}>
            <Select>
              {Object.entries(ROLES).map((value, key) => {
                console.log(value[1])
                return <Option key={key} value={value[1]}>{t('role.' + value[1])}</Option>
              })}
            </Select>
          </Form.Item>
      }

      {
        form ? null
          : <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type='primary' htmlType='submit'>{t('common:save')}</Button>
          </Form.Item>
      }
    </Form>

  )
}

export default UserForm
