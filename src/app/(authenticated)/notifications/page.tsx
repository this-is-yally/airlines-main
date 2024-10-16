'use client'

import { useState, useEffect } from 'react'
import { Typography, List, Switch, Spin, Card, Row, Col } from 'antd'
import { BellOutlined, SettingOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function NotificationsPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [notifications, setNotifications] = useState<any[]>([])
  const [preferences, setPreferences] = useState({
    bookings: true,
    flightUpdates: true,
    promotions: true,
  })

  const { data: notificationsData, isLoading } =
    Api.notification.findMany.useQuery({
      where: { userId: user?.id },
      orderBy: { dateCreated: 'desc' },
    })

  const { mutateAsync: updateUser } = Api.user.update.useMutation()

  useEffect(() => {
    if (notificationsData) {
      setNotifications(notificationsData)
    }
  }, [notificationsData])

  const handlePreferenceChange = async (key: string, checked: boolean) => {
    try {
      await updateUser({
        where: { id: user?.id },
        data: { [`${key}Notifications`]: checked },
      })
      setPreferences(prev => ({ ...prev, [key]: checked }))
      enqueueSnackbar('Notification preferences updated', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to update preferences', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Card>
        <Title level={2}>
          <BellOutlined /> Notifications
        </Title>
        <Text>View and manage your notifications and preferences</Text>

        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col xs={24} md={16}>
            <Card title="Recent Notifications">
              {isLoading ? (
                <Spin />
              ) : (
                <List
                  dataSource={notifications}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.message}
                        description={new Date(
                          item.dateCreated,
                        ).toLocaleString()}
                      />
                    </List.Item>
                  )}
                  locale={{ emptyText: 'No notifications' }}
                />
              )}
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              title={
                <>
                  <SettingOutlined /> Notification Preferences
                </>
              }
            >
              <List>
                <List.Item
                  actions={[
                    <Switch
                      key="bookings"
                      checked={preferences.bookings}
                      onChange={checked =>
                        handlePreferenceChange('bookings', checked)
                      }
                    />,
                  ]}
                >
                  <List.Item.Meta title="Booking Updates" />
                </List.Item>
                <List.Item
                  actions={[
                    <Switch
                      key="flightUpdates"
                      checked={preferences.flightUpdates}
                      onChange={checked =>
                        handlePreferenceChange('flightUpdates', checked)
                      }
                    />,
                  ]}
                >
                  <List.Item.Meta title="Flight Updates" />
                </List.Item>
                <List.Item
                  actions={[
                    <Switch
                      key="promotions"
                      checked={preferences.promotions}
                      onChange={checked =>
                        handlePreferenceChange('promotions', checked)
                      }
                    />,
                  ]}
                >
                  <List.Item.Meta title="Promotions" />
                </List.Item>
              </List>
            </Card>
          </Col>
        </Row>
      </Card>
    </PageLayout>
  )
}
