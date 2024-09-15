"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus } from 'lucide-react'
import { FC } from 'react'

const DashboardContent: FC = () => {
  return (
    <div>
      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

          {/* Project Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-muted-foreground">Active Projects</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">34</p>
                  <p className="text-muted-foreground">Team Members</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">56</p>
                  <p className="text-muted-foreground">Tasks Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="text-sm font-medium">John Doe updated the project status</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Alice Smith added a new task</p>
                    <p className="text-sm text-muted-foreground">5 hours ago</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                    <AvatarFallback>RJ</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Robert Johnson commented on a document</p>
                    <p className="text-sm text-muted-foreground">Yesterday</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Your project collaborators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="John Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alice Smith" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Robert Johnson" />
                  <AvatarFallback>RJ</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Emily Brown" />
                  <AvatarFallback>EB</AvatarFallback>
                </Avatar>
                <Button size="icon" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default DashboardContent;