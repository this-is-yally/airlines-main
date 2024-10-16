'use client'

import { useState } from 'react'
import {
  Typography,
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
} from 'antd'
import { UserOutlined, BookOutlined, MessageOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CustomerManagementPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const {
    data: users,
    isLoading: isLoadingUsers,
    refetch: refetchUsers,
  } = Api.user.findMany.useQuery({
    include: { bookings: true, supportTickets: true },
  })

  const { mutateAsync: updateUser } = Api.user.update.useMutation()
  const { mutateAsync: createSupportTicket } =
    Api.supportTicket.create.useMutation()

  if (user?.globalRole !== 'admin') {
    router.push('/home')
    return null
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Bookings',
      key: 'bookings',
      render: (text: string, record: any) => record.bookings?.length || 0,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button
            icon={<UserOutlined />}
            onClick={() => handleManageUser(record)}
          >
            Manage
          </Button>
          <Button
            icon={<BookOutlined />}
            onClick={() =>
              router.push(`/admin/customers/${record.id}/bookings`)
            }
          >
            Bookings
          </Button>
          <Button
            icon={<MessageOutlined />}
            onClick={() => handleCreateTicket(record)}
          >
            Create Ticket
          </Button>
        </Space>
      ),
    },
  ]

  const handleManageUser = (user: any) => {
    setSelectedUser(user)
    form.setFieldsValue(user)
    setIsModalVisible(true)
  }

  const handleCreateTicket = (user: any) => {
    Modal.confirm({
      title: 'Create Support Ticket',
      content: (
        <Form layout="vertical">
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      ),
      onOk: async values => {
        try {
          await createSupportTicket({
            data: {
              subject: values.subject,
              description: values.description,
              status: 'Open',
              userId: user.id,
            },
          })
          enqueueSnackbar('Support ticket created successfully', {
            variant: 'success',
          })
        } catch (error) {
          enqueueSnackbar('Failed to create support ticket', {
            variant: 'error',
          })
        }
      },
    })
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      await updateUser({
        where: { id: selectedUser.id },
        data: values,
      })
      setIsModalVisible(false)
      refetchUsers()
      enqueueSnackbar('User updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to update user', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Customer Management</Title>
      <Text>
        Manage customer accounts, view booking history, and handle customer
        requests.
      </Text>

      <Table
        columns={columns}
        dataSource={users}
        loading={isLoadingUsers}
        rowKey="id"
        style={{ marginTop: '20px' }}
      />

      <Modal
        title="Manage User"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
              <Select.Option value="Suspended">Suspended</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
