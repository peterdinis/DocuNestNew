'use client'

import { FC, useState } from 'react'
import Link from 'next/link'
import { Menu, X, Bell, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-background shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">DocuNest</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/dashboard" className="text-gray-600 prose prose-a: hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Services</Link>
                <Link href="/projects" className="text-gray-600 prose prose-a: hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Pricing</Link>
                <Button variant={"outline"} className="text-gray-600 prose prose-a: hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Register</Button>
                <Button variant={"outline"} className="text-gray-600 prose prose-a: hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Login</Button>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">View notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="ml-3 relative">
                    <span className="sr-only">Open user menu</span>
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} size="icon">
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Toggle mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/dashboard" className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
          <Link href="/projects" className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Projects</Link>
          <Link href="/tasks" className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Tasks</Link>
          <Link href="/team" className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Team</Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <User className="h-10 w-10 rounded-full" />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">Jane Doe</div>
              <div className="text-sm font-medium text-gray-500">jane@example.com</div>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <Bell className="h-6 w-6" />
              <span className="sr-only">View notifications</span>
            </Button>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <Button variant="ghost" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-100 w-full text-left">Profile</Button>
            <Button variant="ghost" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-100 w-full text-left">Settings</Button>
            <Button variant="ghost" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-100 w-full text-left">Sign out</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation;