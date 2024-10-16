'use client'

import { useState } from 'react'
import {
  Typography,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Button,
  Select,
  Card,
  Space,
} from 'antd'
import { SearchOutlined, FilterOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { RangePicker } = DatePicker
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function FlightSearchPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [form] = Form.useForm()
  const [searchParams, setSearchParams] = useState<any>(null)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [filters, setFilters] = useState({
    maxPrice: 1000,
    maxDuration: 24,
    airline: '',
  })

  const { data: airports } = Api.airport.findMany.useQuery({})

  const { data: flights } = Api.flight.findMany.useQuery(searchParams || {}, {
    enabled: !!searchParams,
    onSuccess: data => {
      setSearchResults(data || [])
    },
    onError: () => {
      enqueueSnackbar('Error searching flights', { variant: 'error' })
    },
  })

  const handleSearch = (values: any) => {
    const { origin, destination, dates, passengers } = values
    const [departureDate, returnDate] = dates

    setSearchParams({
      where: {
        departureAirport: { code: origin },
        arrivalAirport: { code: destination },
        departureTime: {
          gte: departureDate.toISOString(),
          lte: returnDate.toISOString(),
        },
      },
      include: {
        departureAirport: true,
        arrivalAirport: true,
        aircraft: true,
      },
    })
  }

  const handleFilter = () => {
    const filteredResults = searchResults.filter(flight => {
      const duration = dayjs(flight.arrivalTime).diff(
        dayjs(flight.departureTime),
        'hour',
      )
      return (
        duration <= filters.maxDuration &&
        (filters.airline === '' || flight.aircraft?.model === filters.airline)
      )
    })
    setSearchResults(filteredResults)
  }

  const handleBookFlight = (flightId: string) => {
    router.push(`/booking/${flightId}`)
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Flight Search</Title>
        <Text>
          Search for available flights by entering your travel details below.
        </Text>

        <Form form={form} onFinish={handleSearch} layout="vertical">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Space>
              <Form.Item
                name="origin"
                label="Origin"
                rules={[{ required: true }]}
              >
                <Select style={{ width: 200 }} placeholder="Select origin">
                  {airports?.map(airport => (
                    <Select.Option key={airport.id} value={airport.code}>
                      {airport.name} ({airport.code})
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="destination"
                label="Destination"
                rules={[{ required: true }]}
              >
                <Select style={{ width: 200 }} placeholder="Select destination">
                  {airports?.map(airport => (
                    <Select.Option key={airport.id} value={airport.code}>
                      {airport.name} ({airport.code})
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Space>
            <Space>
              <Form.Item
                name="dates"
                label="Travel Dates"
                rules={[{ required: true }]}
              >
                <RangePicker style={{ width: 300 }} />
              </Form.Item>
              <Form.Item
                name="passengers"
                label="Passengers"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} max={10} />
              </Form.Item>
            </Space>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              Search Flights
            </Button>
          </Space>
        </Form>

        {searchResults.length > 0 && (
          <>
            <Title level={3}>Search Results</Title>
            <Space direction="vertical" size="middle">
              <Card title="Filters">
                <Space>
                  <InputNumber
                    min={0}
                    max={10000}
                    value={filters.maxPrice}
                    onChange={value =>
                      setFilters({ ...filters, maxPrice: value || 0 })
                    }
                    addonBefore="Max Price"
                    addonAfter="$"
                  />
                  <InputNumber
                    min={0}
                    max={48}
                    value={filters.maxDuration}
                    onChange={value =>
                      setFilters({ ...filters, maxDuration: value || 0 })
                    }
                    addonBefore="Max Duration"
                    addonAfter="hours"
                  />
                  <Select
                    style={{ width: 200 }}
                    value={filters.airline}
                    onChange={value =>
                      setFilters({ ...filters, airline: value })
                    }
                    placeholder="Select Airline"
                  >
                    <Select.Option value="">All Airlines</Select.Option>
                    {searchResults?.map(flight => (
                      <Select.Option
                        key={flight.aircraft?.id}
                        value={flight.aircraft?.model}
                      >
                        {flight.aircraft?.model}
                      </Select.Option>
                    ))}
                  </Select>
                  <Button onClick={handleFilter} icon={<FilterOutlined />}>
                    Apply Filters
                  </Button>
                </Space>
              </Card>
              {searchResults?.map(flight => (
                <Card key={flight.id}>
                  <Space direction="vertical">
                    <Text
                      strong
                    >{`${flight.departureAirport?.name} to ${flight.arrivalAirport?.name}`}</Text>
                    <Text>{`Departure: ${dayjs(flight.departureTime).format('YYYY-MM-DD HH:mm')}`}</Text>
                    <Text>{`Arrival: ${dayjs(flight.arrivalTime).format('YYYY-MM-DD HH:mm')}`}</Text>
                    <Text>{`Aircraft: ${flight.aircraft?.model}`}</Text>
                    <Button
                      type="primary"
                      onClick={() => handleBookFlight(flight.id)}
                    >
                      Book Flight
                    </Button>
                  </Space>
                </Card>
              ))}
            </Space>
          </>
        )}
      </Space>
    </PageLayout>
  )
}
