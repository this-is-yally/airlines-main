'use client'

import { useUserContext } from '@/core/context'
import { MrbSplashScreen } from '@/designSystem'
import { NavigationLayout } from '@/designSystem/layouts/NavigationLayout'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

type Props = { children: ReactNode }

export default function AuthenticatedLayout({ children }: Props) {
  const { isLoggedIn, isLoading, checkRole } = useUserContext()

  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        router.push('/login')
      } else if (!checkRole('ADMIN')) {
        router.push('/unauthorized')
      }
    }
  }, [isLoading, isLoggedIn, checkRole])

  if (isLoading) {
    return <MrbSplashScreen />
  }

  if (isLoggedIn && checkRole('ADMIN')) {
    return <NavigationLayout>{children}</NavigationLayout>
  }

  return null
}
