import React, { useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Layout, Card, Col, Row } from 'antd';

import {useAuth} from '../../contexts/AuthProvider'

const buttonStyle = {
    width: '100%'
}

const forgotStyle = {
    float: 'right'
}

function Login() {

    const history = useHistory()
    const {login} = useAuth()
    const [loading, setLoading] = useState(false)

    const onFinish = values => {
        setLoading(true)

        login(values).then(response => {
            if(response.data.status !== 'success') {
                setLoading(false)
                message.error(response.data.message)
            }

            history.push('/')
        })
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    }

    return (
        <Layout>
            <Row gutter={8} type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Col xs={{ span: 18 }} sm={{ span: 6 }} md={{ span: 5 }} style={{  maxWidth: '300px' }}>
                    <Card title="Login" bordered={false}>
                        <Form
                            name="login-form"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <a style={{ ...forgotStyle }} href="">
                                    Forgot password
                                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" id={'form-submit'} loading={loading} style={{ ...buttonStyle }}>
                                    Log in
                                </Button>
                                Or <a href="">register now!</a>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Layout>
    )
}

export default withRouter(Login)
