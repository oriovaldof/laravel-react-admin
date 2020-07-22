/* eslint-disable react/jsx-closing-tag-location */
import React, { useState, useEffect } from 'react'

import { Row, Table, Tag, Modal, Button, Form, Popconfirm, message } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { ROLES } from '~/variables'

import UserForm from './UserForm'
import LoadingContent from '~/components/Loading/LoadingContent'
import { appContext } from '~/contexts/AppProvider'
import { useAuth } from '~/contexts/AuthProvider'

import * as service from '~/services/UserService'
import { useTranslation } from 'react-i18next'

function UserList () {
  const [form] = Form.useForm()
  const [users, setUsers] = useState([])
  const [loadingContent, setLoadingContent] = useState(true)
  const { loading } = appContext()
  const [modal, setModal] = useState({
    visible: false,
    title: '',
    user: null
  })
  const authUser = useAuth().user
  const { t } = useTranslation(['user', 'common'])

  const axiosError = e => {
    loading(false)
    const errors = e.response.data.errors
    Object.entries(errors).forEach(([key, error]) => {
      error.forEach(value => {
        message.error(t(value))
      })
    })
  }

  const actions = {
    create: () => {
      setModal({
        visible: true,
        title: t('common:create') + ' ' + t('title'),
        data: null
      })
    },
    edit: user => {
      setModal({
        visible: true,
        title: t('common:edit') + ' ' + t('title'),
        user: user
      })
    },
    store: async user => {
      try {
        loading(true)
        const response = await service.store(user)
        loading(false)
        setUsers([...users, { ...response.data.data, key: response.data.data.id }])
        setModal({
          ...modal,
          visible: false
        })
        form.resetFields()
        message.success(t('user:title') + t('common:message.success.created'))
      } catch (e) {
        return axiosError(e)
      }
    },
    update: async user => {
      try {
        loading(true)
        const response = await service.update(user)
        loading(false)
        setUsers(users.map(obj => (response.data.data.id = obj.id ? { ...response.data.data, key: response.data.data.id } : obj)))
        setModal({
          ...modal,
          visible: false
        })
        message.success(t('user:title') + t('common:message.success.edited'))
      } catch (e) {
        return axiosError(e)
      }
    },
    destroy: async user => {
      try {
        loading(true)
        await service.destroy(user)
        loading(false)
        setUsers(users.filter(u => u.id !== user.id))
        message.success(t('user:title') + t('common:message.success.deleted'))
      } catch (e) {
        return axiosError(e)
      }
    }
  }

  const columns = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: t('role.label'),
      dataIndex: 'roles',
      key: 'roles',
      render: roles => {
        return <Tag color={(roles.includes(ROLES.admin) ? 'processing' : 'default')}>{t('role.' + roles)}</Tag>
      }
    },
    {
      key: 'action',
      render: user => (
        user.id === 1 ? null // First admin user can't be modified
          : <>
            <a style={{ marginRight: '10px' }} onClick={() => { actions.edit(user) }}><EditOutlined /> {t('common:edit')}</a>
            <Popconfirm
              title={t('common:message.confirm', {
                action: t('common:delete'),
                this: t('user:this'),
                entity: t('user:title')
              })}
              cancelText={t('common:no')}
              okText={t('common:yes')}
              onConfirm={() => { actions.destroy(user) }}
            >
              <a><DeleteOutlined /> {t('common:delete')}</a>
            </Popconfirm>
          </>
      )
    }
  ]

  const loadUsers = async () => {
    const response = await service.all()

    const data = response.data

    Object.entries(data).forEach(([key, value]) => {
      data[key].key = data[key].id
    })

    setUsers(data.filter(u => u.id !== authUser.id))
    setLoadingContent(false)
  }

  const onFinish = values => {
    if (modal.user) {
      actions.update({ ...values, id: modal.user.id })
    } else {
      actions.store(values)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    loadingContent ? <LoadingContent />
      : <>
        <Row justify='end' style={{ marginBottom: 10 }}>
          <Button onClick={() => { actions.create() }} type='primary'><PlusOutlined /> {t('common:add')}</Button>
        </Row>
        <Table columns={columns} dataSource={users} pagination={{ hideOnSinglePage: true, pageSize: 10 }} />
        <Modal
          visible={modal.visible}
          closable={false}
          title={modal.title}
          cancelText={t('common:cancel')}
          okText={t('common:save')}
          onOk={() => { form.submit() }}
          onCancel={() => {
            setModal({
              ...modal,
              visible: false
            })
          }}
          afterClose={() => {
            setModal({
              ...modal,
              user: null,
              title: ''
            })
          }}
        >
          <UserForm user={modal.user} onFinish={onFinish} form={form} />
        </Modal>
      </>
  )
}

export default UserList
