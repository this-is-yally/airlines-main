'use client'

import { useState } from 'react'
import {
  Typography,
  Collapse,
  Button,
  Input,
  Form,
  Space,
  Row,
  Col,
} from 'antd'
import {
  QuestionCircleOutlined,
  MessageOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
const { Panel } = Collapse
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CustomerSupportPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [chatOpen, setChatOpen] = useState(false)
  const [ticketForm] = Form.useForm()

  const { mutateAsync: createTicket } = Api.supportTicket.create.useMutation()

  const faqData = [
    {
      question: 'How do I change my flight?',
      answer:
        'You can change your flight by going to the My Bookings page and selecting the booking you wish to modify.',
    },
    {
      question: 'What is the baggage allowance?',
      answer:
        'The baggage allowance varies depending on your ticket type and destination. Please check your booking details for specific information.',
    },
    {
      question: 'How can I request a refund?',
      answer:
        'To request a refund, please contact our customer support team with your booking details.',
    },
  ]

  const handleChatInitiate = () => {
    setChatOpen(true)
    enqueueSnackbar('Chat initiated. An agent will be with you shortly.', {
      variant: 'info',
    })
  }

  const handleTicketSubmit = async (values: any) => {
    try {
      await createTicket({
        data: {
          subject: values.subject,
          description: values.description,
          status: 'Open',
          userId: user?.id,
        },
      })
      enqueueSnackbar('Support ticket submitted successfully', {
        variant: 'success',
      })
      ticketForm.resetFields()
    } catch (error) {
      enqueueSnackbar('Failed to submit support ticket', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Customer Support</Title>
        <Paragraph>
          Welcome to our Customer Support page. Here you can find answers to
          frequently asked questions, initiate a chat with our support team, or
          submit a support ticket.
        </Paragraph>

        <Collapse expandIconPosition="end">
          <Panel
            header="Frequently Asked Questions"
            key="1"
            extra={<QuestionCircleOutlined />}
          >
            {faqData.map((faq, index) => (
              <div key={index} style={{ marginBottom: 16 }}>
                <Text strong>{faq.question}</Text>
                <Paragraph>{faq.answer}</Paragraph>
              </div>
            ))}
          </Panel>
        </Collapse>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Button
              type="primary"
              icon={<MessageOutlined />}
              onClick={handleChatInitiate}
              disabled={chatOpen}
              block
            >
              Start Live Chat
            </Button>
          </Col>
          <Col xs={24} sm={12}>
            <Button
              type="default"
              icon={<FileTextOutlined />}
              onClick={() => ticketForm.resetFields()}
              block
            >
              Submit Support Ticket
            </Button>
          </Col>
        </Row>

        <Form form={ticketForm} onFinish={handleTicketSubmit} layout="vertical">
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please enter a subject' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Ticket
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </PageLayout>
  )
}
