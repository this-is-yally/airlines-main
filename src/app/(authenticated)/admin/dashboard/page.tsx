'use client'

import { Typography, Card, Row, Col, Statistic, Spin } from 'antd'
import {
  RocketOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: flightsData, isLoading: isFlightsLoading } =
    Api.flight.findMany.useQuery({
      where: {
        departureTime: {
          gte: dayjs().startOf('day').toISOString(),
          lte: dayjs().endOf('day').toISOString(),
        },
      },
    })

  const { data: bookingsData, isLoading: isBookingsLoading } =
    Api.booking.findMany.useQuery({
      where: {
        bookingDate: {
          gte: dayjs().startOf('day').toISOString(),
          lte: dayjs().endOf('day').toISOString(),
        },
      },
    })

  const { data: supportTicketsData, isLoading: isSupportTicketsLoading } =
    Api.supportTicket.findMany.useQuery({
      where: {
        status: 'OPEN',
      },
    })

  if (user?.globalRole !== 'ADMIN') {
    enqueueSnackbar('You do not have permission to access this page.', {
      variant: 'error',
    })
    router.push('/home')
    return null
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Admin Dashboard</Title>
      <Text>
        Overview of current flight operations, bookings, and system status.
      </Text>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            {isFlightsLoading ? (
              <Spin />
            ) : (
              <Statistic
                title="Today's Flights"
                value={flightsData?.length || 0}
                prefix={<RocketOutlined />}
              />
            )}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            {isBookingsLoading ? (
              <Spin />
            ) : (
              <Statistic
                title="Today's Bookings"
                value={bookingsData?.length || 0}
                prefix={<UserOutlined />}
              />
            )}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            {isSupportTicketsLoading ? (
              <Spin />
            ) : (
              <Statistic
                title="Open Support Tickets"
                value={supportTicketsData?.length || 0}
                prefix={<ExclamationCircleOutlined />}
              />
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="System Status">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title="Booking System"
                  value="Operational"
                  prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Flight Management"
                  value="Operational"
                  prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="Quick Actions">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card hoverable onClick={() => router.push('/admin/flights')}>
                  Manage Flights
                </Card>
              </Col>
              <Col span={8}>
                <Card hoverable onClick={() => router.push('/admin/customers')}>
                  Manage Customers
                </Card>
              </Col>
              <Col span={8}>
                <Card hoverable onClick={() => router.push('/support')}>
                  View Support Tickets
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
