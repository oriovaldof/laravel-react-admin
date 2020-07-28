/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-template-curly-in-string */
import React, { useEffect } from 'react'

import { Form as AntForm, Input, Select, Button } from 'antd'
import { useTranslation } from 'react-i18next'

import { ROLES } from '@variables'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}

function Form ({ user, onFinish, form }) {
  const { Option } = Select
  const { t } = useTranslation(['user', 'common'])

  const validateMessages = {
    required: t('common:message.error.required', { label: '${label}' }),
    types: {
      email: t('common:message.error.types.email')
    }
  }

  const confirPassword = ({ getFieldValue }) => ({
    validator (rule, value) {
      if ((!getFieldValue('password') && !value) || getFieldValue('password') === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(t('user:error.password-confirmation')))
    }
  })

  useEffect(() => {
    if (form) {
      form.resetFields()
    }
  }, [user])

  return (
    <AntForm {...layout} validateMessages={validateMessages} onFinish={onFinish} initialValues={user ? { ...user } : {}} form={form}>
      <AntForm.Item
        name='name'
        label={t('name')}
        rules={[{ required: true }]}
      >
        <Input minLength={3} maxLength={40} />
      </AntForm.Item>

      <AntForm.Item
        name='email'
        label={t('email')}
        rules={[{ required: true, type: 'email' }]}
      >
        <Input disabled={!!user} />
      </AntForm.Item>

      <AntForm.Item
        name='password'
        label={t('password')}
        rules={[(user ? {} : { required: true })]}
      >
        <Input.Password placeholder='********' minLength={6} maxLength={16} />
      </AntForm.Item>

      <AntForm.Item
        name='password_confirmation'
        label={t('password-confirmation')}
        rules={[
          (user ? {} : { required: true }),
          confirPassword
        ]}
      >
        <Input.Password placeholder='********' minLength={6} maxLength={16} />
      </AntForm.Item>

      {
        !form ? null
          : <AntForm.Item name='roles' label={t('role.label')} rules={[{ required: true }]}>
            <Select>
              {Object.entries(ROLES).map((value, key) => {
                return <Option key={key} value={value[1]}>{t('role.' + value[1])}</Option>
              })}
            </Select>
          </AntForm.Item>
      }

      {
        form ? null
          : <AntForm.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type='primary' htmlType='submit'>{t('common:save')}</Button>
          </AntForm.Item>
      }
    </AntForm>

  )
}

export default Form
