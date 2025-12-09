import { useEffect, useState } from 'react'

interface SafeAreaInsets {
  top: number
  bottom: number
  left: number
  right: number
}

export const useSafeArea = () => {
  const [safeArea, setSafeArea] = useState<SafeAreaInsets>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })

  useEffect(() => {
    const getSafeArea = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const { SafeArea } = await import('capacitor-plugin-safe-area')
        const area = await SafeArea.getSafeAreaInsets()
        setSafeArea(area.insets)

        // Listen for orientation changes
        const listener = await SafeArea.addListener(
          'safeAreaChanged',
          (data) => {
            setSafeArea(data.insets)
          },
        )

        return () => {
          listener.remove()
        }
      } catch {
        // Fallback for web - no safe area needed
        console.log('Safe area not available (running in web mode)')
        setSafeArea({ top: 0, bottom: 0, left: 0, right: 0 })
      }
    }

    getSafeArea()
  }, [])

  return safeArea
}
