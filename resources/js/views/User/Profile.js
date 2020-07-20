import React from 'react'

import { useAuth } from '~/contexts/AuthProvider'

import Layout from '~/components/Layout'
import UserForm from '~/components/User/UserForm'
import { message } from 'antd'

import { updateProfile } from '~/services/UserService'
import { appContext } from '~/contexts/AppProvider'

function Profile() {
  const { user, updateUser } = useAuth()
  const { loading } = appContext()

  const onFinish = async values => {
    try {
      loading(true)
      await updateProfile({ ...values, id: user.id })
      await updateUser(values)
      loading(false)
      message.success('Usuário alterado com sucesso!')
    } catch (e) {
      loading(false)
      const errors = e.response.data.errors
      Object.entries(errors).forEach(([key, error]) => {
        error.forEach(value => {
          message.error(value)
        })
      });
    }
  }

  return (
    <Layout>
      <UserForm user={user} onFinish={onFinish}/>
    </Layout>
  )
}

export default Profile