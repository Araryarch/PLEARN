'use client'

import { GalleryVerticalEnd } from 'lucide-react'
import { LoginForm } from '@/components/login-form'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (session) router.push('/')
  }, [session, status, router])

  if (status === 'loading') return <p></p>
  if (!session)
    return (
      <div className="grid h-[100dvh] lg:grid-cols-2 bg-background overflow-hidden">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a
              href="#"
              className="flex items-center gap-2 font-medium text-foreground"
            >
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-4" />
              </div>
              PLEARN
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block">
          <Image
            src="/placeholder.svg"
            alt="Image"
            fill
            className="absolute inset-0 h-full w-full object-cover opacity-50 grayscale"
          />
        </div>
      </div>
    )
}
