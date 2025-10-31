'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    })

    if (res?.error) {
      setMessage(res.error)
    } else {
      router.push('/')
    }
  }

  return (
    <form
      className={cn('flex flex-col gap-6 rounded-lg bg-[#1e1e2e]', className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-[#cdd6f4]">
          Login to your account
        </h1>
        <p className="text-sm text-[#6c7086]">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email" className="text-[#cdd6f4]">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter Your Email"
            required
            className="bg-[#1e1e2e] text-[#cdd6f4] border-[#313244]"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password" className="text-[#cdd6f4]">
              Password
            </Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline text-[#f5c2e7]"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            placeholder="Enter Your Password"
            className="bg-[#1e1e2e] text-[#cdd6f4] border-[#313244]"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {message && (
          <p className="text-sm text-[#f5c2e7] text-center">{message}</p>
        )}

        <Button type="submit" className="w-full bg-[#f5c2e7] text-[#1e1e2e]">
          Login
        </Button>
      </div>

      <div className="text-center text-sm text-[#6c7086]">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-[#f5c2e7] underline">
          Sign up
        </Link>
      </div>
    </form>
  )
}
