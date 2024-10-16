'use client'

import { useState, useEffect } from 'react'
import {
  Typography,
  Form,
  Input,
  InputNumber,
  Button,
  Table,
  Space,
  Modal,
  Select,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, EuroOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { Prisma } from '@prisma/client'
type FlightWithBookings = Prisma.FlightGetPayload<{
  include: { bookings: true }
}> & { region: string }
type Promotion = {
  id: string
  code: string
  discount: number
  startDate: string
  endDate: string
}
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function PricingManagementPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [flights, setFlights] = useState<FlightWithBookings[]>([])
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [isFlightModalVisible, setIsFlightModalVisible] = useState(false)
  const [isPromotionModalVisible, setIsPromotionModalVisible] = useState(false)
  const [editingFlight, setEditingFlight] = useState<FlightWithBookings | null>(
    null,
  )
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(
    null,
  )

  const { data: flightsData, refetch: refetchFlights } =
    Api.flight.findMany.useQuery({
      include: { bookings: true },
    })
  const { data: promotionsData, refetch: refetchPromotions } =
    Api.booking.findMany.useQuery({
      where: { status: 'PROMOTION' },
      select: { id: true, bookingDate: true, status: true },
    })

  const { mutateAsync: updateFlight } = Api.flight.update.useMutation()
  const { mutateAsync: createBooking } = Api.booking.create.useMutation()
  const { mutateAsync: updateBooking } = Api.booking.update.useMutation()
  const { mutateAsync: deleteBooking } = Api.booking.delete.useMutation()

  useEffect(() => {
    if (flightsData) setFlights(flightsData as FlightWithBookings[])
    if (promotionsData) {
      const formattedPromotions = promotionsData.map(booking => ({
        id: booking.id,
        code: booking.status,
        discount: 0, // Placeholder, as we don't have actual discount information
        startDate: booking.bookingDate || '',
        endDate: dayjs(booking.bookingDate).add(7, 'day').format('YYYY-MM-DD'),
      }))
      setPromotions(formattedPromotions)
    }
  }, [flightsData, promotionsData])

  const handleFlightPriceUpdate = async (values: any) => {
    try {
      if (!editingFlight) return
      await updateFlight({
        where: { id: editingFlight.id },
        data: {
          flightNumber: values.flightNumber,
          region: values.region,
          bookings: {
            updateMany: [
              { where: { status: 'ECONOMY' }, data: { bookingDate: values.economyPrice.toString() } },
              { where: { status: 'BUSINESS' }, data: { bookingDate: values.businessPrice.toString() } },
              { where: { status: 'FIRST_CLASS' }, data: { bookingDate: values.firstClassPrice.toString() } },
            ],
          },
        },
      })
      enqueueSnackbar('Flight updated successfully', { variant: 'success' })
      setIsFlightModalVisible(false)
      refetchFlights()
    } catch (error) {
      enqueueSnackbar('Failed to update flight', { variant: 'error' })
    }
  }

  const handlePromotionSubmit = async (values: any) => {
    try {
      if (editingPromotion) {
        await updateBooking({
          where: { id: editingPromotion.id },
          data: {
            status: values.code,
            bookingDate: values.startDate,
          },
        })
        enqueueSnackbar('Promotion updated successfully', {
          variant: 'success',
        })
      } else {
        await createBooking({
          data: {
            status: 'PROMOTION',
            bookingDate: values.startDate,
          },
        })
        enqueueSnackbar('Promotion created successfully', {
          variant: 'success',
        })
      }
      setIsPromotionModalVisible(false)
      refetchPromotions()
    } catch (error) {
      enqueueSnackbar('Failed to save promotion', { variant: 'error' })
    }
  }

  const handleDeletePromotion = async (id: string) => {
    try {
      await deleteBooking({ where: { id } })
      enqueueSnackbar('Promotion deleted successfully', { variant: 'success' })
      refetchPromotions()
    } catch (error) {
      enqueueSnackbar('Failed to delete promotion', { variant: 'error' })
    }
  }

  const flightColumns = [
    { title: 'Flight Number', dataIndex: 'flightNumber', key: 'flightNumber' },
    { title: 'Region', dataIndex: 'region', key: 'region' },
    {
      title: 'Economy Price (€)',
      key: 'economyPrice',
      render: (text: string, record: FlightWithBookings) => {
        const economyBooking = record.bookings?.find(
          b => b.status === 'ECONOMY',
        )
        return economyBooking ? `€${economyBooking.bookingDate}` : 'N/A'
      },
    },
    {
      title: 'Business Price (€)',
      key: 'businessPrice',
      render: (text: string, record: FlightWithBookings) => {
        const businessBooking = record.bookings?.find(
          b => b.status === 'BUSINESS',
        )
        return businessBooking ? `€${businessBooking.bookingDate}` : 'N/A'
      },
    },
    {
      title: 'First Class Price (€)',
      key: 'firstClassPrice',
      render: (text: string, record: FlightWithBookings) => {
        const firstClassBooking = record.bookings?.find(
          b => b.status === 'FIRST_CLASS',
        )
        return firstClassBooking ? `€${firstClassBooking.bookingDate}` : 'N/A'
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: FlightWithBookings) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => {
            setEditingFlight(record)
            setIsFlightModalVisible(true)
          }}
        >
          Edit Flight
        </Button>
      ),
    },
  ]

  const promotionColumns = [
    { title: 'Code', dataIndex: 'code', key: 'code' },
    { title: 'Discount', dataIndex: 'discount', key: 'discount' },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate' },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Promotion) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingPromotion(record)
              setIsPromotionModalVisible(true)
            }}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeletePromotion(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Pricing Management</Title>
      <Text>Manage flight prices and promotional offers</Text>

      <Title level={3} style={{ marginTop: '2rem' }}>
        Flight Prices
      </Title>
      <Table dataSource={flights} columns={flightColumns} rowKey="id" />

      <Title level={3} style={{ marginTop: '2rem' }}>
        Promotional Offers
      </Title>
      <Button
        icon={<PlusOutlined />}
        onClick={() => {
          setEditingPromotion(null)
          setIsPromotionModalVisible(true)
        }}
        style={{ marginBottom: '1rem' }}
      >
        Add Promotion
      </Button>
      <Table dataSource={promotions} columns={promotionColumns} rowKey="id" />

      <Modal
        title={editingFlight ? 'Edit Flight' : 'Add Flight'}
        open={isFlightModalVisible}
        onCancel={() => setIsFlightModalVisible(false)}
        footer={null}
      >
        <Form
          onFinish={handleFlightPriceUpdate}
          initialValues={editingFlight}
          layout="vertical"
        >
          <Form.Item
            name="flightNumber"
            label="Flight Number"
            rules={[
              { required: true, message: 'Please input the flight number!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="region"
            label="Region"
            rules={[
              { required: true, message: 'Please select the region!' },
            ]}
          >
            <Select>
              <Select.Option value="EUROPE">Europe</Select.Option>
              <Select.Option value="OTHER">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="economyPrice"
            label="Economy Price (€)"
            rules={[
              { required: true, message: 'Please input the economy price!' },
            ]}
          >
            <InputNumber
              prefix="€"
              min={0}
              step={0.01}
              precision={2}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="businessPrice"
            label="Business Price (€)"
            rules={[
              { required: true, message: 'Please input the business price!' },
            ]}
          >
            <InputNumber
              prefix="€"
              min={0}
              step={0.01}
              precision={2}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="firstClassPrice"
            label="First Class Price (€)"
            rules={[
              { required: true, message: 'Please input the first class price!' },
            ]}
          >
            <InputNumber
              prefix="€"
              min={0}
              step={0.01}
              precision={2}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={editingPromotion ? 'Edit Promotion' : 'Add Promotion'}
        open={isPromotionModalVisible}
        onCancel={() => setIsPromotionModalVisible(false)}
        footer={null}
      >
        <Form
          onFinish={handlePromotionSubmit}
          initialValues={editingPromotion}
          layout="vertical"
        >
          <Form.Item
            name="code"
            label="Promotion Code"
            rules={[
              { required: true, message: 'Please input the promotion code!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[
              { required: true, message: 'Please input the start date!' },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
