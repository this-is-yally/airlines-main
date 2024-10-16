'use client'

import { Typography, List, Card, Button, Row, Col, Space } from 'antd'
import {
  LineOutlined,
  ClockCircleOutlined,
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

export default function FlightResultsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: flights, isLoading } = Api.flight.findMany.useQuery({
    select: {
      id: true,
      flightNumber: true,
      departureTime: true,
      arrivalTime: true,
      region: true,
      averageEstimatedPrice: true,
      departureAirport: {
        select: { city: true, code: true }
      },
      arrivalAirport: {
        select: { city: true, code: true }
      },
      aircraft: {
        select: { model: true }
      }
    },
  })

  const handleSelectFlight = (flightId: string) => {
    router.push(`/booking/${flightId}`)
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Available Flights</Title>
        <Text>
          Compare and select from the available flight options matching your
          search criteria.
        </Text>

        {isLoading ? (
          <Text>Loading flights...</Text>
        ) : (
          <List
            dataSource={flights}
            renderItem={flight => (
              <List.Item>
                <Card style={{ width: '100%' }}>
                  <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={18}>
                      <Space direction="vertical">
                        <Text strong>
                          <LineOutlined /> {flight.flightNumber}
                        </Text>
                        <Text>
                          {flight.departureAirport?.city} (
                          {flight.departureAirport?.code}) to{' '}
                          {flight.arrivalAirport?.city} (
                          {flight.arrivalAirport?.code})
                        </Text>
                        <Text>
                          <ClockCircleOutlined /> Departure:{' '}
                          {dayjs(flight.departureTime).format(
                            'MMM D, YYYY HH:mm',
                          )}
                        </Text>
                        <Text>
                          <ClockCircleOutlined /> Arrival:{' '}
                          {dayjs(flight.arrivalTime).format(
                            'MMM D, YYYY HH:mm',
                          )}
                        </Text>
                        <Text>
                          <EuroOutlined /> Avg. Estimated Price: {flight.region === 'EUROPE' ? '€' : '$'}
                          {flight.averageEstimatedPrice ? flight.averageEstimatedPrice.toFixed(2) : 'N/A'}
                        </Text>
                      </Space>
                    </Col>
                    <Col xs={24} sm={6}>
                      <Button
                        type="primary"
                        onClick={() => handleSelectFlight(flight.id)}
                        block
                      >
                        Select Flight
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </List.Item>
            )}
          />
        )}
      </Space>
    </PageLayout>
  )
}
