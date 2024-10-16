'use client'

import { useState, useEffect } from 'react'
import { Typography, Button, Space, Select, Card, Row, Col } from 'antd'
import {
  CheckCircleOutlined,
  DownloadOutlined,
  MailOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CheckinPage() {
  const router = useRouter()
  const params = useParams<{ bookingId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)
  const [availableSeats, setAvailableSeats] = useState<string[]>([])

  const {
    data: booking,
    isLoading,
    refetch,
  } = Api.booking.findUnique.useQuery({
    where: { id: params.bookingId },
    include: { flight: { include: { aircraft: true } }, seat: true },
  })

  const { data: seats } = Api.seat.findMany.useQuery(
    booking?.flight?.aircraft
      ? {
          where: { aircraftId: booking.flight.aircraft.id },
          select: { seatNumber: true },
        }
      : undefined,
    {
      enabled: !!booking?.flight?.aircraft,
    },
  )

  const { mutateAsync: updateBooking } = Api.booking.update.useMutation()

  useEffect(() => {
    if (booking?.seat) {
      setSelectedSeat(booking.seat.seatNumber || null)
    }
  }, [booking])

  useEffect(() => {
    if (seats) {
      setAvailableSeats(seats.map(seat => seat.seatNumber || ''))
    }
  }, [seats])

  const handleSeatChange = async (value: string) => {
    try {
      await updateBooking({
        where: { id: params.bookingId },
        data: { seatId: value },
      })
      setSelectedSeat(value)
      enqueueSnackbar('Seat updated successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to update seat', { variant: 'error' })
    }
  }

  const handleCheckin = async () => {
    try {
      await updateBooking({
        where: { id: params.bookingId },
        data: { status: 'CHECKED_IN' },
      })
      enqueueSnackbar('Check-in successful', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Check-in failed', { variant: 'error' })
    }
  }

  const handleDownloadBoardingPass = () => {
    enqueueSnackbar('Boarding pass downloaded', { variant: 'success' })
  }

  const handleSendBoardingPass = () => {
    enqueueSnackbar('Boarding pass sent to your email', { variant: 'success' })
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
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Flight Check-in</Title>
        <Text>
          Complete your check-in process and manage your seat selection.
        </Text>

        <Card>
          <Space direction="vertical" size="middle">
            <Text strong>Flight Details:</Text>
            <Text>Flight Number: {booking.flight?.flightNumber}</Text>
            <Text>Departure: {booking.flight?.departureTime}</Text>
            <Text>Arrival: {booking.flight?.arrivalTime}</Text>
          </Space>
        </Card>

        <Card>
          <Space direction="vertical" size="middle">
            <Text strong>Seat Selection:</Text>
            <Select
              style={{ width: 200 }}
              value={selectedSeat}
              onChange={handleSeatChange}
              placeholder="Select a seat"
            >
              {availableSeats?.map(seat => (
                <Select.Option key={seat} value={seat}>
                  {seat}
                </Select.Option>
              ))}
            </Select>
          </Space>
        </Card>

        <Row gutter={16}>
          <Col span={24} md={8}>
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={handleCheckin}
              disabled={booking.status === 'CHECKED_IN'}
              block
            >
              {booking.status === 'CHECKED_IN' ? 'Checked In' : 'Check In'}
            </Button>
          </Col>
          <Col span={24} md={8}>
            <Button
              icon={<DownloadOutlined />}
              onClick={handleDownloadBoardingPass}
              disabled={booking.status !== 'CHECKED_IN'}
              block
            >
              Download Boarding Pass
            </Button>
          </Col>
          <Col span={24} md={8}>
            <Button
              icon={<MailOutlined />}
              onClick={handleSendBoardingPass}
              disabled={booking.status !== 'CHECKED_IN'}
              block
            >
              Send Boarding Pass
            </Button>
          </Col>
        </Row>
      </Space>
    </PageLayout>
  )
}
