'use client'

import { useState } from 'react'
import { Typography, Form, Input, DatePicker, Button, Card, Spin } from 'antd'
import {
  SearchOutlined,
  LineOutlined,
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

export default function FlightStatusPage() {
  type FlightStatus = {
    flightNumber: string;
    departureTime: string;
    arrivalTime: string;
    departureAirport: { name: string; code: string };
    arrivalAirport: { name: string; code: string };
  }
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [flightNumber, setFlightNumber] = useState('')
  const [flightDate, setFlightDate] = useState<dayjs.Dayjs | null>(null)
  const [loading, setLoading] = useState(false)

  const { data: flightStatus, refetch } = Api.flight.findFirst.useQuery(
    {
      where: { flightNumber, departureTime: flightDate?.toISOString() },
      select: {
        flightNumber: true,
        departureTime: true,
        arrivalTime: true,
        departureAirport: { select: { name: true, code: true } },
        arrivalAirport: { select: { name: true, code: true } }
      }
    },
    {
      enabled: false,
    },
  )

  const handleSearch = async () => {
    if (!flightNumber || !flightDate) {
      enqueueSnackbar('Please enter both flight number and date', {
        variant: 'error',
      })
      return
    }

    setLoading(true)
    try {
      await refetch()
      setLoading(false)
    } catch (error) {
      enqueueSnackbar('Error fetching flight status', { variant: 'error' })
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Flight Status</Title>
      <Text>
        Check the status of any flight by entering the flight number and date.
      </Text>

      <Form layout="vertical" style={{ marginTop: 24 }}>
        <Form.Item label="Flight Number">
          <Input
            placeholder="Enter flight number"
            value={flightNumber}
            onChange={e => setFlightNumber(e.target.value)}
            prefix={<LineOutlined />}
          />
        </Form.Item>
        <Form.Item label="Flight Date">
          <DatePicker
            style={{ width: '100%' }}
            value={flightDate}
            onChange={date => setFlightDate(date)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            loading={loading}
          >
            Search Flight Status
          </Button>
        </Form.Item>
      </Form>

      {loading && <Spin size="large" />}

      {flightStatus && !loading && (
        <Card title="Flight Status" style={{ marginTop: 24 }}>
          <p>
            <strong>Flight Number:</strong> {flightStatus.flightNumber}
          </p>
          <p>
            <strong>Departure:</strong> {flightStatus.departureAirport?.name} (
            {flightStatus.departureAirport?.code})
          </p>
          <p>
            <strong>Arrival:</strong> {flightStatus.arrivalAirport?.name} (
            {flightStatus.arrivalAirport?.code})
          </p>
          <p>
            <strong>Scheduled Departure:</strong>{' '}
            {dayjs(flightStatus.departureTime).format('MMMM D, YYYY HH:mm')}
          </p>
          <p>
            <strong>Scheduled Arrival:</strong>{' '}
            {dayjs(flightStatus.arrivalTime).format('MMMM D, YYYY HH:mm')}
          </p>
        </Card>
      )}
    </PageLayout>
  )
}
