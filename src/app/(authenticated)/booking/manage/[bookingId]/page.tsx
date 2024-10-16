'use client'

import { useState, useEffect } from 'react'
import { Typography, Form, Input, Select, Button, Space, Modal } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function BookingManagementPage() {
  const router = useRouter()
  const params = useParams<{ bookingId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [form] = Form.useForm()
  const [isEditing, setIsEditing] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const {
    data: booking,
    isLoading,
    refetch,
  } = Api.booking.findUnique.useQuery({
    where: { id: params.bookingId },
    include: { passenger: true, flight: true, seat: true },
  })

  const { mutateAsync: updateBooking } = Api.booking.update.useMutation()
  const { mutateAsync: deleteBooking } = Api.booking.delete.useMutation()

  useEffect(() => {
    if (booking) {
      form.setFieldsValue({
        firstName: booking.passenger?.firstName,
        lastName: booking.passenger?.lastName,
        passportNumber: booking.passenger?.passportNumber,
        seatId: booking.seat?.id,
      })
    }
  }, [booking, form])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    form.resetFields()
  }

  const handleSave = async (values: any) => {
    try {
      await updateBooking({
        where: { id: params.bookingId },
        data: {
          passenger: {
            update: {
              firstName: values.firstName,
              lastName: values.lastName,
              passportNumber: values.passportNumber,
            },
          },
          seat: {
            connect: { id: values.seatId },
          },
        },
      })
      enqueueSnackbar('Booking updated successfully', { variant: 'success' })
      setIsEditing(false)
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to update booking', { variant: 'error' })
    }
  }

  const showCancelModal = () => {
    setIsModalVisible(true)
  }

  const handleCancelBooking = async () => {
    try {
      await deleteBooking({ where: { id: params.bookingId } })
      enqueueSnackbar('Booking cancelled successfully', { variant: 'success' })
      router.push('/my-bookings')
    } catch (error) {
      enqueueSnackbar('Failed to cancel booking', { variant: 'error' })
    }
    setIsModalVisible(false)
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Text>Loading...</Text>
      </PageLayout>
    )
  }

  if (!booking) {
    return (
      <PageLayout layout="narrow">
        <Text>Booking not found</Text>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Manage Your Booking</Title>
      <Text>
        Here you can modify your booking details or cancel your booking if
        eligible.
      </Text>

      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item name="firstName" label="First Name">
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name">
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item name="passportNumber" label="Passport Number">
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item name="seatId" label="Seat Number">
          <Select disabled={!isEditing}>
            <Select.Option value={booking.seat?.id}>
              {booking.seat?.seatNumber}
            </Select.Option>
          </Select>
        </Form.Item>

        <Space>
          {!isEditing && (
            <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
              Edit Details
            </Button>
          )}
          {isEditing && (
            <>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </>
          )}
          <Button danger icon={<DeleteOutlined />} onClick={showCancelModal}>
            Cancel Booking
          </Button>
        </Space>
      </Form>

      <div style={{ marginTop: '20px' }}>
        <Title level={4}>Booking Details</Title>
        <Text>Flight Number: {booking.flight?.flightNumber}</Text>
        <br />
        <Text>
          Departure:{' '}
          {dayjs(booking.flight?.departureTime).format('MMMM D, YYYY HH:mm')}
        </Text>
        <br />
        <Text>
          Arrival:{' '}
          {dayjs(booking.flight?.arrivalTime).format('MMMM D, YYYY HH:mm')}
        </Text>
        <br />
        <Text>Status: {booking.status}</Text>
      </div>

      <Modal
        title="Cancel Booking"
        open={isModalVisible}
        onOk={handleCancelBooking}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>
          Are you sure you want to cancel this booking? This action cannot be
          undone.
        </p>
      </Modal>
    </PageLayout>
  )
}
