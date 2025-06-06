'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function GTMPageView() {
  const pathname = usePathname()

  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'pageview',
      page: pathname,
    })
  }, [pathname])

  return null
}
