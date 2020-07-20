import React from 'react'

import { Form, Input, Button } from 'antd'

import Layout from '../../components/Layout'

const validateMessages = {
  required: '${label} é obrigatório!',
  types: {
    email: '${label} não é um e-mail válido!',
  },
}

const confirPassword = ({getFieldValue}) => ({
  validator(rule, value) {
    if(!value || getFieldValue('password') === value) {
      return Promise.resolve()
    }
    return Promise.reject('As senhas não coincidem!')
  }
})

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
}

function Register() {
  const onFinish = () => {

  }

  return (
    <Layout>
      <Form {...layout} validateMessages={validateMessages} onFinish={onFinish}>
        <Form.Item
          name={'name'}
          label={'Nome'}
          rules={[{ required: true }]}
        >
          <Input placeholder={'Nome'}/>
        </Form.Item>
        <Form.Item
          name={'email'}
          label={'E-mail'}
        >
          <Input readOnly/>
        </Form.Item>

        <Form.Item
          name={'password'}
          label={'Senha'}
          rules={[{ required: true }]}
        >
          <Input.Password placeholder={'********'}/>
        </Form.Item>

        <Form.Item
          name={'confirm'}
          label={'Confirmação Senha'}
          rules={[
            { required: true },
            confirPassword
          ]}
        >
          <Input.Password placeholder={'********'}/>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type={'primary'} htmlType={'submit'}>Salvar</Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}

export default Register