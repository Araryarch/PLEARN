'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Github } from 'lucide-react'
import { signIn } from 'next-auth/react'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  return (
    <form
      className={cn('flex flex-col gap-6 rounded-lg bg-[#1e1e2e]', className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-[#cdd6f4]">
          Login to your account
        </h1>
        <p className="text-sm text-center text-[#6c7086]">
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
          />
        </div>
        <Button type="submit" className="w-full bg-[#f5c2e7] text-[#1e1e2e]">
          Login
        </Button>
        <div className="relative text-center text-sm text-[#6c7086]">
          <span className="relative px-2 bg-[#1e1e2e] text-[#6c7086]">
            Or continue with
          </span>
          <div className="absolute inset-0 flex items-center border-t border-[#313244] z-0"></div>
        </div>
        <Button
          variant="outline"
          onClick={() => signIn('github', { callbackUrl: '/' })}
          className="w-full flex items-center justify-center gap-2 cursor-pointer border-[#313244] text-[#cdd6f4] bg-[#1e1e2e]"
        >
          <Github />
          Login with GitHub
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
