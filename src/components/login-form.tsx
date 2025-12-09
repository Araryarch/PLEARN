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
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Welcome back
        </h1>
        <p className="text-sm text-zinc-400">
          Enter your email to sign in to your account
        </p>
      </div>

      <div className="grid gap-6">
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
          <div className="flex items-center">
            <Label htmlFor="password" className="text-zinc-200">
              Password
            </Label>
            <a
              href="#"
              className="ml-auto text-sm text-zinc-400 underline-offset-4 hover:text-white transition-colors"
            >
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-700"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {message && (
          <p className="text-sm text-red-500 text-center">{message}</p>
        )}

        <Button
          type="submit"
          className="w-full bg-white text-black hover:bg-zinc-200 transition-colors"
        >
          Sign In
        </Button>
      </div>

      <div className="text-center text-sm text-zinc-400">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-medium text-white hover:underline underline-offset-4"
        >
          Sign up
        </Link>
      </div>
    </form>
  )
}
