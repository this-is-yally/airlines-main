'use client'

import { Typography, List, Card, Space, Button, Tag } from 'antd'
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function MyBookingsPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: bookings, isLoading } = Api.booking.findMany.useQuery({
    where: { userId: user?.id },
    include: {
      flight: {
        include: {
          departureAirport: true,
          arrivalAirport: true,
        },
      },
      seat: true,
    },
    orderBy: { bookingDate: 'desc' },
  })

  const handleViewBooking = (bookingId: string) => {
    router.push(`/booking/manage/${bookingId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'green'
      case 'PENDING':
        return 'orange'
      case 'CANCELLED':
        return 'red'
      default:
        return 'default'
    }
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>My Bookings</Title>
        <Text>View and manage your current and past bookings.</Text>

        {isLoading ? (
          <Text>Loading your bookings...</Text>
        ) : (
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 3 }}
            dataSource={bookings}
            renderItem={booking => (
              <List.Item>
                <Card
                  title={`Booking #${booking.id}`}
                  extra={
                    <Tag color={getStatusColor(booking.status || '')}>
                      {booking.status}
                    </Tag>
                  }
                  actions={[
                    <Button
                      key="view"
                      onClick={() => handleViewBooking(booking.id)}
                    >
                      View Details
                    </Button>,
                  ]}
                >
                  <Space direction="vertical">
                    <Text strong>{booking.flight?.flightNumber}</Text>
                    <Space>
                      <EnvironmentOutlined />
                      <Text>
                        {booking.flight?.departureAirport?.city} to{' '}
                        {booking.flight?.arrivalAirport?.city}
                      </Text>
                    </Space>
                    <Space>
                      <CalendarOutlined />
                      <Text>
                        {dayjs(booking.flight?.departureTime).format(
                          'MMM D, YYYY',
                        )}
                      </Text>
                    </Space>
                    <Space>
                      <ClockCircleOutlined />
                      <Text>
                        {dayjs(booking.flight?.departureTime).format('HH:mm')} -{' '}
                        {dayjs(booking.flight?.arrivalTime).format('HH:mm')}
                      </Text>
                    </Space>
                    <Text>Seat: {booking.seat?.seatNumber}</Text>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        )}
      </Space>
    </PageLayout>
  )
}
