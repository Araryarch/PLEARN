'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const router = useRouter()
  const [form, setForm] = useState({
    username: '',
    tagName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [defaultTag, setDefaultTag] = useState('')
  const [message, setMessage] = useState('')

  // generate default tagName saat username berubah
  useEffect(() => {
    if (form.username.trim()) {
      const random = Math.floor(1000 + Math.random() * 9000)
      setDefaultTag(`${form.username}#${random}`)
      setForm((prev) => ({ ...prev, tagName: `${form.username}#${random}` }))
    }
  }, [form.username])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()
    setMessage(data.message)

    if (res.ok) {
      router.push('/login')
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
          Register your account
        </h1>
        <p className="text-sm text-[#6c7086]">
          Enter your username, tagName (optional), email, and password
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username" className="text-[#cdd6f4]">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter Your Username"
            required
            className="bg-[#1e1e2e] text-[#cdd6f4] border-[#313244]"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="tagName" className="text-[#cdd6f4]">
            Tag Name (optional)
          </Label>
          <Input
            id="tagName"
            type="text"
            placeholder={defaultTag}
            className="bg-[#1e1e2e] text-[#cdd6f4] border-[#313244]"
            value={form.tagName}
            onChange={handleChange}
          />
        </div>

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
          <Label htmlFor="password" className="text-[#cdd6f4]">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter Your Password"
            required
            className="bg-[#1e1e2e] text-[#cdd6f4] border-[#313244]"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="confirmPassword" className="text-[#cdd6f4]">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Your Password"
            required
            className="bg-[#1e1e2e] text-[#cdd6f4] border-[#313244]"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full bg-[#f5c2e7] text-[#1e1e2e]">
          Register
        </Button>

        {message && (
          <p className="text-sm text-[#f5c2e7] text-center">{message}</p>
        )}
      </div>

      <div className="text-center text-sm text-[#6c7086]">
        Already have an account?{' '}
        <Link href="/login" className="text-[#f5c2e7] underline">
          Login
        </Link>
      </div>
    </form>
  )
}
