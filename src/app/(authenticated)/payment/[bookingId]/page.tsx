'use client'

import { useState, useEffect } from 'react'
import { Typography, Card, Radio, Button, Space, Spin, Row, Col } from 'antd'
import {
  DollarOutlined,
  CreditCardOutlined,
  BankOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function PaymentPage() {
  const router = useRouter()
  const params = useParams<{ bookingId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [paymentMethod, setPaymentMethod] = useState<string>('creditCard')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const { data: booking, isLoading } = Api.booking.findUnique.useQuery({
    where: { id: params.bookingId },
    include: {
      flight: { include: { departureAirport: true, arrivalAirport: true } },
      seat: true,
    },
  })

  const { mutateAsync: createPayment } = Api.payment.create.useMutation()

  const handlePaymentMethodChange = (e: any) => {
    setPaymentMethod(e.target.value)
  }

  const handlePayment = async () => {
    if (!booking) return

    setIsProcessing(true)
    try {
      await createPayment({
        data: {
          amount: booking.flight?.price?.toString() || '0',
          paymentDate: new Date().toISOString(),
          paymentMethod: paymentMethod,
          status: 'completed',
          bookingId: booking.id,
        },
      })
      enqueueSnackbar('Payment successful!', { variant: 'success' })
      router.push(`/booking/confirmation/${booking.id}`)
    } catch (error) {
      enqueueSnackbar('Payment failed. Please try again.', { variant: 'error' })
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
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
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Complete Your Payment</Title>
        <Card title="Booking Summary">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong>Flight:</Text> {booking.flight?.flightNumber}
            </Col>
            <Col span={12}>
              <Text strong>Date:</Text>{' '}
              {new Date(
                booking.flight?.departureTime || '',
              ).toLocaleDateString()}
            </Col>
            <Col span={12}>
              <Text strong>From:</Text> {booking.flight?.departureAirport?.name}
            </Col>
            <Col span={12}>
              <Text strong>To:</Text> {booking.flight?.arrivalAirport?.name}
            </Col>
            <Col span={12}>
              <Text strong>Seat:</Text> {booking.seat?.seatNumber}
            </Col>
            <Col span={12}>
              <Text strong>Class:</Text> {booking.seat?.class}
            </Col>
            <Col span={24}>
              <Text strong>Total Amount:</Text> $
              {booking.flight?.price?.toString() || '0'}
            </Col>
          </Row>
        </Card>
        <Card title="Select Payment Method">
          <Radio.Group
            onChange={handlePaymentMethodChange}
            value={paymentMethod}
          >
            <Space direction="vertical">
              <Radio value="creditCard">
                <CreditCardOutlined /> Credit Card
              </Radio>
              <Radio value="debitCard">
                <BankOutlined /> Debit Card
              </Radio>
              <Radio value="paypal">
                <DollarOutlined /> PayPal
              </Radio>
            </Space>
          </Radio.Group>
        </Card>
        <Button
          type="primary"
          onClick={handlePayment}
          loading={isProcessing}
          block
        >
          Complete Payment
        </Button>
      </Space>
    </PageLayout>
  )
}
