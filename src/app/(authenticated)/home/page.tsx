'use client'

import { Typography, Card, Row, Col, Button } from 'antd'
import {
  SearchOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  EuroOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: featuredFlights, isLoading: isLoadingFlights } =
    Api.flight.findMany.useQuery({
      take: 3,
      orderBy: { departureTime: 'asc' },
      select: {
        id: true,
        flightNumber: true,
        departureTime: true,
        region: true,
        departureAirportId: true,
        arrivalAirportId: true,
        averageEstimatedPrice: true,
      },
    })

  const handleQuickLink = (path: string) => {
    router.push(path)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={1}>Welcome to FlyHigh Airlines</Title>
      <Text>Your gateway to seamless travel experiences.</Text>

      <Row gutter={[16, 16]} style={{ marginTop: '2rem' }}>
        <Col xs={24} sm={8}>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            block
            onClick={() => handleQuickLink('/flights/search')}
          >
            Search Flights
          </Button>
        </Col>
        <Col xs={24} sm={8}>
          <Button
            icon={<CalendarOutlined />}
            block
            onClick={() => handleQuickLink('/my-bookings')}
          >
            Manage Bookings
          </Button>
        </Col>
        <Col xs={24} sm={8}>
          <Button
            icon={<InfoCircleOutlined />}
            block
            onClick={() => handleQuickLink('/flight-status')}
          >
            Flight Status
          </Button>
        </Col>
      </Row>

      <Title level={2} style={{ marginTop: '2rem' }}>
        Featured Flights
      </Title>
      <Row gutter={[16, 16]}>
        {isLoadingFlights ? (
          <Col span={24}>
            <Text>Loading featured flights...</Text>
          </Col>
        ) : (
          featuredFlights?.map(flight => (
            <Col xs={24} sm={8} key={flight.id}>
              <Card title={`Flight ${flight.flightNumber}`} hoverable>
                <p>From: {flight.departureAirportId}</p>
                <p>To: {flight.arrivalAirportId}</p>
                <p>
                  Departure:{' '}
                  {new Date(flight.departureTime || '').toLocaleString()}
                </p>
                <p>
                  Average Estimated Price:{' '}
                  {flight.region === 'EUROPE' ? (
                    <><EuroOutlined /> {parseFloat(flight.averageEstimatedPrice?.toString() || '0').toFixed(2)}</>
                  ) : (
                    <>${parseFloat(flight.averageEstimatedPrice?.toString() || '0').toFixed(2)}</>
                  )}
                </p>
                <Button
                  type="primary"
                  onClick={() => router.push(`/booking/${flight.id}`)}
                >
                  Book Now
                </Button>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <Title level={2} style={{ marginTop: '2rem' }}>
        Current Promotions
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Card
            title="Summer Sale"
            extra={<a href="#">Learn More</a>}
            hoverable
          >
            <p>Get up to 20% off on select summer destinations!</p>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card
            title="Loyalty Program"
            extra={<a href="#">Join Now</a>}
            hoverable
          >
            <p>Earn miles on every flight and enjoy exclusive benefits!</p>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
