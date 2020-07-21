/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-template-curly-in-string */
import React, { useEffect } from 'react'

import { Form, Input, Select, Button } from 'antd'

import { ROLES } from '~/variables'

const validateMessages = {
  required: '${label} é obrigatório!',
  types: {
    email: '${label} não é um e-mail válido!'
  }
}

const confirPassword = ({ getFieldValue }) => ({
  validator (rule, value) {
    if ((!getFieldValue('password') && !value) || getFieldValue('password') === value) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('As senhas não coincidem!'))
  }
})

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}

function UserForm ({ user, onFinish, form }) {
  const { Option } = Select

  useEffect(() => {
    if (form) {
      form.resetFields()
    }
  }, [user])

  return (
    <Form {...layout} validateMessages={validateMessages} onFinish={onFinish} initialValues={user ? { ...user } : {}} form={form}>
      <Form.Item
        name='name'
        label='Nome'
        rules={[{ required: true }]}
      >
        <Input minLength={3} maxLength={40} />
      </Form.Item>

      <Form.Item
        name='email'
        label='E-mail'
      >
        <Input disabled={!!user} />
      </Form.Item>

      <Form.Item
        name='password'
        label='Senha'
        rules={[(user ? {} : { required: true })]}
      >
        <Input.Password placeholder='********' minLength={6} maxLength={16} />
      </Form.Item>

      <Form.Item
        name='password_confirmation'
        label='Confirmação Senha'
        rules={[
          (user ? {} : { required: true }),
          confirPassword
        ]}
      >
        <Input.Password placeholder='********' minLength={6} maxLength={16} />
      </Form.Item>

      {
        !form ? null
          : <Form.Item name='roles' label='Tipo' rules={[{ required: true }]}>
            <Select>
              <Option value={ROLES.support}>Normal</Option>
              <Option value={ROLES.admin}>Administrador</Option>
            </Select>
          </Form.Item>
      }

      {
        form ? null
          : <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type='primary' htmlType='submit'>Salvar</Button>
          </Form.Item>
      }
    </Form>

  )
}

export default UserForm
