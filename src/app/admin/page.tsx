import React from "react";
import Link from "next/link";
import {
  Users,
  BookOpen,
  ShieldBan,
  UserCheck,
  ArrowRight,
  Activity,
} from "lucide-react";

import prisma from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function AdminDashboard() {
  // Parallel data fetching for performance
  const [userCount, bannedCount, lessonCount, adminCount] = await Promise.all([
    prisma.user.count(),
    prisma.bannedUser.count(),
    prisma.lesson.count(),
    prisma.user.count({ where: { role: "ADMIN" } }),
  ]);

  return (
    <div className="space-y-8 p-1">
      {/* Page Header */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of system performance and statistics.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Example action - logic would need to be added for download */}
          <Button disabled variant="outline">
            Download Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
            <p className="text-xs text-muted-foreground">
              Registered active accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Administrators
            </CardTitle>
            <UserCheck className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminCount}</div>
            <p className="text-xs text-muted-foreground">
              Users with elevated privileges
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lessonCount}</div>
            <p className="text-xs text-muted-foreground">
              Content modules available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Banned Users</CardTitle>
            <ShieldBan className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bannedCount}</div>
            <p className="text-xs text-muted-foreground">
              Restricted from access
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions / Recent Activity Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Quick Actions Card */}
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and management shortcuts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Button variant="secondary" className="justify-between" asChild>
                <Link href="/admin/users">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" /> Manage Users
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>
              <Button variant="secondary" className="justify-between" asChild>
                <Link href="/admin/lessons">
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> Manage Lessons
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Status / Info Card */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current platform operational status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 rounded-md border p-4">
              <Activity className="h-5 w-5 text-emerald-500" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  All Systems Operational
                </p>
                <p className="text-sm text-muted-foreground">
                  Database and API services are running normally.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}