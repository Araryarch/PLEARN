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
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Create an account
        </h1>
        <p className="text-sm text-zinc-400">
          Enter your details below to create your account
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username" className="text-zinc-200">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="johndoe"
            required
            className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-700"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="tagName" className="text-zinc-200">
            Tag Name <span className="text-zinc-500">(optional)</span>
          </Label>
          <Input
            id="tagName"
            type="text"
            placeholder={defaultTag || 'johndoe#1234'}
            className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-700"
            value={form.tagName}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email" className="text-zinc-200">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-700"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password" className="text-zinc-200">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-700"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="confirmPassword" className="text-zinc-200">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
            className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-700"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-white text-black hover:bg-zinc-200 transition-colors"
        >
          Register
        </Button>

        {message && (
          <p className="text-sm text-red-500 text-center">{message}</p>
        )}
      </div>

      <div className="text-center text-sm text-zinc-400">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-white hover:underline underline-offset-4"
        >
          Login
        </Link>
      </div>
    </form>
  )
}
