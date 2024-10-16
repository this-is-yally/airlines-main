import { useUserContext } from '@/core/context'
import { Flex } from 'antd'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Mobilebar } from './components/Mobilebar'
import { Topbar } from './components/Topbar'
import { NavigationItem } from './types'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const params: Record<string, string> = useParams()

  const goTo = (url: string) => {
    router.push(url)
  }

  const items: NavigationItem[] = [
    {
      key: '/home',
      label: 'Home',
      position: 'topbar',

      onClick: () => goTo('/home'),
    },

    {
      key: '/flights/search',
      label: 'Flight Search',
      position: 'topbar',

      onClick: () => goTo('/flights/search'),
    },

    {
      key: '/flights/results',
      label: 'Flight Results',
      position: 'topbar',

      onClick: () => goTo('/flights/results'),
    },

    {
      key: '/my-bookings',
      label: 'My Bookings',
      position: 'topbar',

      onClick: () => goTo('/my-bookings'),
    },

    {
      key: '/flight-status',
      label: 'Flight Status',
      position: 'topbar',

      onClick: () => goTo('/flight-status'),
    },

    {
      key: '/support',
      label: 'Customer Support',
      position: 'topbar',

      onClick: () => goTo('/support'),
    },

    {
      key: '/admin/dashboard',
      label: 'Admin Dashboard',
      position: 'topbar',

      onClick: () => goTo('/admin/dashboard'),
    },

    {
      key: '/admin/flights',
      label: 'Flight Management',
      position: 'topbar',

      onClick: () => goTo('/admin/flights'),
    },

    {
      key: '/admin/pricing',
      label: 'Pricing Management',
      position: 'topbar',

      onClick: () => goTo('/admin/pricing'),
    },

    {
      key: '/admin/customers',
      label: 'Customer Management',
      position: 'topbar',

      onClick: () => goTo('/admin/customers'),
    },

    {
      key: '/notifications',
      label: 'Notifications',
      position: 'topbar',

      onClick: () => goTo('/notifications'),
    },
  ]

  const itemsVisible = items
    .filter(item => item.isVisible !== false)
    .map(item => ({
      key: item.key,
      label: item.label,
      position: item.position,
      onClick: item.onClick,
    }))

  const itemsTopbar = itemsVisible.filter(item => item.position === 'topbar')

  const itemsLeftbar = itemsVisible.filter(item => item.position === 'leftbar')

  const itemsLeftbottom = itemsVisible.filter(
    item => item.position === 'leftbar-bottom',
  )

  const itemsMobile = itemsVisible

  let keySelected = pathname

  Object.entries(params).forEach(([key, value]) => {
    keySelected = keySelected.replace(`/${value}`, `/:${key}`)
  })

  return (
    <>
      <Topbar keySelected={keySelected} items={itemsTopbar} />

      <Mobilebar keySelected={keySelected} items={itemsMobile} />

      <Flex flex={1} style={{ overflowY: 'hidden' }}>
        <Leftbar
          keySelected={keySelected}
          items={itemsLeftbar}
          itemsBottom={itemsLeftbottom}
        />

        <Flex flex={1} vertical style={{ overflowY: 'hidden' }}>
          {children}
        </Flex>
      </Flex>
    </>
  )
}
