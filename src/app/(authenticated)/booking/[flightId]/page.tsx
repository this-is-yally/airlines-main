'use client'

import { Typography, Form, Input, Select, Button, Space, Row, Col } from 'antd'
import {
  UserOutlined,
  IdcardOutlined,
  CompassOutlined,
  DollarOutlined,
  EuroOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { Prisma } from '@prisma/client'
const { Title, Text } = Typography
const { Option } = Select
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

type FlightWithRelations = Prisma.FlightGetPayload<{
  include: {
    departureAirport: true;
    arrivalAirport: true;
    seats: true;
  }
}> & {
  averageEstimatedPrice: number | null;
}

export default function BookingPage() {
  const router = useRouter()
  const params = useParams<{ flightId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)
  const [extraServices, setExtraServices] = useState<string[]>([])

  const { data: flightData, isLoading: isFlightLoading } =
    Api.flight.findUnique.useQuery({
      where: { id: params.flightId },
      select: {
        id: true,
        flightNumber: true,
        departureTime: true,
        arrivalTime: true,
        price: true,
        averageEstimatedPrice: true,
        departureAirport: {
          select: { id: true, name: true, code: true }
        },
        arrivalAirport: {
          select: { id: true, name: true, code: true }
        },
        seats: {
          select: { id: true, seatNumber: true, class: true, isAvailable: true }
        },
      },
    })

  const { mutateAsync: createBooking } = Api.booking.create.useMutation()

  const handleSeatChange = (value: string) => {
    setSelectedSeat(value)
  }

  const handleExtraServicesChange = (values: string[]) => {
    setExtraServices(values)
  }

  const onFinish = async (values: any) => {
    if (!user || !flightData) return

    try {
      const bookingData: Prisma.BookingCreateInput = {
        user: { connect: { id: user.id } },
        flight: { connect: { id: flightData.id } },
        passenger: {
          create: {
            firstName: values.firstName,
            lastName: values.lastName,
            passportNumber: values.passportNumber,
            user: { connect: { id: user.id } },
          },
        },
        seat: selectedSeat ? { connect: { id: selectedSeat } } : undefined,
        status: 'PENDING',
      }

      const newBooking = await createBooking({ data: bookingData })
      enqueueSnackbar('Booking created successfully!', { variant: 'success' })
      router.push(`/payment/${newBooking.id}`)
    } catch (error) {
      console.error('Error creating booking:', error)
      enqueueSnackbar('Failed to create booking. Please try again.', {
        variant: 'error',
      })
    }
  }

  if (isFlightLoading) {
    return (
      <PageLayout layout="narrow">
        <Text>Loading...</Text>
      </PageLayout>
    )
  }

  if (!flightData) {
    return (
      <PageLayout layout="narrow">
        <Text>Flight not found</Text>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Passenger Details and Preferences</Title>
      <Text>
        Please enter your details and select your preferences for the flight.
      </Text>

      <Space direction="vertical" size="large" style={{ width: '100%', marginBottom: '2rem' }}>
        <Title level={3}>Flight Price Information</Title>
        <Row gutter={16}>
          <Col span={12}>
            <Text strong>Current Price:</Text>
            <Text> {flightData.price ? `${flightData.price > 0 ? '€' : '$'}${flightData.price.toFixed(2)}` : 'N/A'}</Text>
          </Col>
          <Col span={12}>
            <Text strong>Average Estimated Price:</Text>
            <Text> {flightData.averageEstimatedPrice ? `${flightData.averageEstimatedPrice > 0 ? '€' : '$'}${flightData.averageEstimatedPrice.toFixed(2)}` : 'N/A'}</Text>
          </Col>
        </Row>
      </Space>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ marginTop: '2rem' }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: 'Please enter your first name' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your first name"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: 'Please enter your last name' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your last name"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="passportNumber"
          label="Passport Number"
          rules={[
            { required: true, message: 'Please enter your passport number' },
          ]}
        >
          <Input
            prefix={<IdcardOutlined />}
            placeholder="Enter your passport number"
          />
        </Form.Item>

        <Form.Item name="seatPreference" label="Seat Preference">
          <Select
            onChange={handleSeatChange}
            placeholder="Select your preferred seat"
          >
            {flightData.seats?.filter(seat => seat.isAvailable).map(seat => (
              <Option
                key={seat.id}
                value={seat.id}
              >{`${seat.seatNumber} (${seat.class})`}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="extraServices" label="Extra Services">
          <Select
            mode="multiple"
            placeholder="Select extra services"
            onChange={handleExtraServicesChange}
          >
            <Option value="meal">In-flight Meal</Option>
            <Option value="luggage">Extra Luggage</Option>
            <Option value="wifi">Wi-Fi Access</Option>
            <Option value="entertainment">Premium Entertainment</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button 
              type="primary" 
              htmlType="submit" 
              icon={flightData?.price && flightData.price > 0 ? <EuroOutlined /> : <DollarOutlined />}
            >
              Proceed to Payment ({flightData?.price && flightData.price > 0 ? '€' : '$'}{flightData?.price?.toFixed(2)})
            </Button>
            <Button
              onClick={() => router.push('/flights/results')}
              icon={<CompassOutlined />}
            >
              Back to Flight Results
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
