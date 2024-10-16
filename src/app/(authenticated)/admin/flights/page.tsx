'use client'

import { useState, useEffect } from 'react'
import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { Prisma, User } from '@prisma/client'
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function FlightManagementPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [flights, setFlights] = useState<Prisma.FlightGetPayload<{ include: { departureAirport: true; arrivalAirport: true; aircraft: true } }>[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [editingFlightId, setEditingFlightId] = useState<string | null>(null)

  const { data: flightsData, refetch } = Api.flight.findMany.useQuery({
    include: { departureAirport: true, arrivalAirport: true, aircraft: true },
  })

  const { data: airports } = Api.airport.findMany.useQuery({})
  const { data: aircraft } = Api.aircraft.findMany.useQuery({})

  const { data: existingFlightNumbers } = Api.flight.findMany.useQuery({
    select: { flightNumber: true },
  })

  const { mutateAsync: createFlight } = Api.flight.create.useMutation()
  const { mutateAsync: updateFlight } = Api.flight.update.useMutation()
  const { mutateAsync: deleteFlight } = Api.flight.delete.useMutation()

  useEffect(() => {
    if (flightsData) {
      setFlights(flightsData)
    }
  }, [flightsData])

  const showModal = (flight?: any) => {
    if (flight) {
      setEditingFlightId(flight.id)
      form.setFieldsValue({
        ...flight,
        departureTime: dayjs(flight.departureTime),
        arrivalTime: dayjs(flight.arrivalTime),
      })
    } else {
      setEditingFlightId(null)
      form.resetFields()
    }
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      
      if (values.departureTime.isAfter(values.arrivalTime)) {
        form.setFields([
          {
            name: 'arrivalTime',
            errors: ['Arrival time must be after departure time'],
          },
        ])
        return
      }

      const flightData = {
        ...values,
        departureTime: values.departureTime.toISOString(),
        arrivalTime: values.arrivalTime.toISOString(),
      }

      if (editingFlightId) {
        await updateFlight({ where: { id: editingFlightId }, data: flightData })
        enqueueSnackbar('Flight updated successfully', { variant: 'success' })
      } else {
        await createFlight({ data: flightData })
        enqueueSnackbar('Flight created successfully', { variant: 'success' })
      }

      setIsModalVisible(false)
      refetch()
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        if ('errorFields' in error) {
          const validationError = error as any
          validationError.errorFields.forEach((field: { name: string[], errors: string[] }) => {
            form.setFields([
              {
                name: field.name,
                errors: field.errors,
              },
            ])
          })
        } else {
          enqueueSnackbar(`Error saving flight: ${error.message}`, { variant: 'error' })
        }
      } else {
        enqueueSnackbar('An unexpected error occurred', { variant: 'error' })
      }
    } finally {
      setIsModalVisible(false)
      refetch()
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteFlight({ where: { id } })
      enqueueSnackbar('Flight deleted successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Error deleting flight', { variant: 'error' })
    }
  }

  const columns = [
    { title: 'Flight Number', dataIndex: 'flightNumber', key: 'flightNumber' },
    {
      title: 'Departure',
      dataIndex: ['departureAirport', 'name'],
      key: 'departure',
    },
    { title: 'Arrival', dataIndex: ['arrivalAirport', 'name'], key: 'arrival' },
    {
      title: 'Departure Time',
      dataIndex: 'departureTime',
      key: 'departureTime',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Arrival Time',
      dataIndex: 'arrivalTime',
      key: 'arrivalTime',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    { title: 'Aircraft', dataIndex: ['aircraft', 'model'], key: 'aircraft' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            danger
          />
        </>
      ),
    },
  ]

  if (user?.globalRole !== 'ADMIN') {
    return (
      <PageLayout layout="narrow">
        <Text>Access denied. Admin rights required.</Text>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Flight Management</Title>
      <Text>Add, edit, or cancel flights and update flight schedules.</Text>

      <Button
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add New Flight
      </Button>

      <Table columns={columns} dataSource={flights} rowKey="id" />

      <Modal
        title={editingFlightId ? 'Edit Flight' : 'Add New Flight'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="flightNumber"
            label="Flight Number"
            rules={[
              { required: true },
              {
                validator: (_, value) => {
                  if (value && existingFlightNumbers?.some(flight => flight.flightNumber === value)) {
                    return Promise.reject('Flight number already exists')
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="departureAirportId"
            label="Departure Airport"
            rules={[{ required: true }]}
          >
            <Select>
              {airports?.map((airport: any) => (
                <Select.Option key={airport.id} value={airport.id}>
                  {airport.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="arrivalAirportId"
            label="Arrival Airport"
            rules={[{ required: true }]}
          >
            <Select>
              {airports?.map((airport: any) => (
                <Select.Option key={airport.id} value={airport.id}>
                  {airport.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="departureTime"
            label="Departure Time"
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || !getFieldValue('arrivalTime') || value.isBefore(getFieldValue('arrivalTime'))) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Departure time must be before arrival time'))
                },
              }),
            ]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            name="arrivalTime"
            label="Arrival Time"
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || !getFieldValue('departureTime') || value.isAfter(getFieldValue('departureTime'))) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Arrival time must be after departure time'))
                },
              }),
            ]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            name="aircraftId"
            label="Aircraft"
            rules={[{ required: true }]}
          >
            <Select>
              {aircraft?.map((a: any) => (
                <Select.Option key={a.id} value={a.id}>
                  {a.model}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
