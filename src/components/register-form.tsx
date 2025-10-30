import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Github } from 'lucide-react'

export function RegisterForm({
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
          Register your account
        </h1>
        <p className="text-sm text-center text-[#6c7086]">
          Enter your username, email, and password to register
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
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password" className="text-[#cdd6f4]">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            required
            placeholder="Enter Your Password"
            className="bg-[#1e1e2e] text-[#cdd6f4] border-[#313244]"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword" className="text-[#cdd6f4]">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            required
            placeholder="Confirm Your Password"
            className="bg-[#1e1e2e] text-[#cdd6f4] border-[#313244]"
          />
        </div>
        <Button type="submit" className="w-full bg-[#f5c2e7] text-[#1e1e2e]">
          Register
        </Button>
        <div className="relative text-center text-sm text-[#6c7086]">
          <span className="relative px-2 bg-[#1e1e2e] text-[#6c7086]">
            Or continue with
          </span>
          <div className="absolute inset-0 flex items-center border-t border-[#313244] z-0"></div>
        </div>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 cursor-pointer border-[#313244] text-[#cdd6f4] bg-[#1e1e2e]"
        >
          <Github />
          Register with GitHub
        </Button>
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
