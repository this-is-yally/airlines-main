'use client'

import { Typography, Button, Spin, Card, Row, Col, Divider } from 'antd'
import {
  DownloadOutlined,
  PrinterOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function BookingConfirmationPage() {
  const router = useRouter()
  const params = useParams<{ bookingId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: booking, isLoading } = Api.booking.findUnique.useQuery({
    where: { id: params.bookingId },
    include: {
      flight: {
        include: {
          departureAirport: true,
          arrivalAirport: true,
          aircraft: true,
        },
      },
      passenger: true,
      seat: true,
    },
  })

  const handleDownload = () => {
    // Implement download functionality here
    enqueueSnackbar('Booking confirmation downloaded', { variant: 'success' })
  }

  const handlePrint = () => {
    window.print()
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
        <Title level={2}>Booking Not Found</Title>
        <Paragraph>
          Sorry, we couldn't find the booking you're looking for.
        </Paragraph>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Card>
        <Title level={2}>
          <CheckCircleOutlined style={{ color: '#52c41a' }} /> Booking
          Confirmation
        </Title>
        <Paragraph>
          Thank you for booking with us. Here are your booking details and
          itinerary.
        </Paragraph>

        <Divider />

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Title level={4}>Booking Details</Title>
            <Paragraph>
              <Text strong>Booking ID:</Text> {booking.id}
              <br />
              <Text strong>Booking Date:</Text>{' '}
              {dayjs(booking.bookingDate).format('MMMM D, YYYY')}
              <br />
              <Text strong>Status:</Text> {booking.status}
            </Paragraph>
          </Col>
          <Col xs={24} sm={12}>
            <Title level={4}>Passenger Information</Title>
            <Paragraph>
              <Text strong>Name:</Text> {booking.passenger?.firstName}{' '}
              {booking.passenger?.lastName}
              <br />
              <Text strong>Passport Number:</Text>{' '}
              {booking.passenger?.passportNumber}
            </Paragraph>
          </Col>
        </Row>

        <Divider />

        <Title level={4}>Flight Information</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Paragraph>
              <Text strong>Flight Number:</Text> {booking.flight?.flightNumber}
              <br />
              <Text strong>Departure:</Text>{' '}
              {booking.flight?.departureAirport?.name} (
              {booking.flight?.departureAirport?.code})<br />
              <Text strong>Departure Time:</Text>{' '}
              {dayjs(booking.flight?.departureTime).format(
                'MMMM D, YYYY HH:mm',
              )}
            </Paragraph>
          </Col>
          <Col xs={24} sm={12}>
            <Paragraph>
              <Text strong>Arrival:</Text>{' '}
              {booking.flight?.arrivalAirport?.name} (
              {booking.flight?.arrivalAirport?.code})<br />
              <Text strong>Arrival Time:</Text>{' '}
              {dayjs(booking.flight?.arrivalTime).format('MMMM D, YYYY HH:mm')}
              <br />
              <Text strong>Aircraft:</Text> {booking.flight?.aircraft?.model}
            </Paragraph>
          </Col>
        </Row>

        <Paragraph>
          <Text strong>Seat:</Text> {booking.seat?.seatNumber} (
          {booking.seat?.class})
        </Paragraph>

        <Divider />

        <Row gutter={16} justify="end">
          <Col>
            <Button icon={<DownloadOutlined />} onClick={handleDownload}>
              Download
            </Button>
          </Col>
          <Col>
            <Button icon={<PrinterOutlined />} onClick={handlePrint}>
              Print
            </Button>
          </Col>
        </Row>
      </Card>
    </PageLayout>
  )
}
