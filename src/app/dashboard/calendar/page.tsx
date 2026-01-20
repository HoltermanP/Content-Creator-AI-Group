"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  MoreHorizontal
} from "lucide-react";
import Link from "next/link";
import WorkflowHeader from "@/components/WorkflowHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  scheduledAt: string;
  status: "DRAFT" | "SCHEDULED" | "PUBLISHED" | "FAILED";
  company: {
    id: string;
    name: string;
  };
  linkedinUrl?: string;
}

interface CalendarDay {
  date: Date;
  posts: ScheduledPost[];
  isToday: boolean;
  isCurrentMonth: boolean;
}

export default function CalendarPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    // TODO: Fetch scheduled posts from API
    // For new users, show empty calendar
    const mockPosts: ScheduledPost[] = [
      // Empty for new users - they need to create their first posts
    ];

    setScheduledPosts(mockPosts);
  }, [session, status, router]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const days: CalendarDay[] = [];

    // Add days from previous month to fill the first week
    const firstDayOfWeek = firstDay.getDay();
    const prevMonthLastDay = new Date(year, month, 0);
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const dayDate = new Date(prevMonthLastDay);
      dayDate.setDate(prevMonthLastDay.getDate() - i);
      days.push({
        date: dayDate,
        posts: [],
        isToday: false,
        isCurrentMonth: false
      });
    }

    // Add days of current month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day);
      const dayPosts = scheduledPosts.filter(post => {
        const postDate = new Date(post.scheduledAt);
        return postDate.toDateString() === dayDate.toDateString();
      });

      days.push({
        date: dayDate,
        posts: dayPosts,
        isToday: dayDate.toDateString() === today.toDateString(),
        isCurrentMonth: true
      });
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getUpcomingPosts = () => {
    const now = new Date();
    return scheduledPosts
      .filter(post => new Date(post.scheduledAt) > now)
      .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
      .slice(0, 5);
  };

  const getPostStatusIcon = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "SCHEDULED":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "DRAFT":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "FAILED":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Kalender laden...</p>
        </div>
      </div>
    );
  }

  const days = getDaysInMonth(currentDate);
  const upcomingPosts = getUpcomingPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <WorkflowHeader currentPage="schedule" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Kalender</h1>
            <p className="text-gray-600">Plan en beheer je LinkedIn content planning</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === "month" ? "week" : "month")}
            >
              {viewMode === "month" ? "Week" : "Maand"} weergave
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {formatMonthYear(currentDate)}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.01 }}
                      className={`
                        min-h-24 p-2 border rounded-lg cursor-pointer hover:shadow-md transition-all
                        ${day.isToday ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}
                        ${!day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''}
                      `}
                    >
                      <div className="text-sm font-medium mb-1">
                        {day.date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {day.posts.map((post) => (
                          <div
                            key={post.id}
                            className="text-xs p-1 bg-blue-100 text-blue-800 rounded truncate"
                            title={`${post.title} - ${formatTime(post.scheduledAt)}`}
                          >
                            {formatTime(post.scheduledAt)} - {post.title}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Aankomende Posts
                </CardTitle>
                <CardDescription>
                  Je volgende geplande posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingPosts.length === 0 ? (
                    <div className="text-center py-4">
                      <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Geen aankomende posts</p>
                      <Link href="/dashboard/posts/new">
                        <Button size="sm" className="mt-2">
                          Plan een post
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    upcomingPosts.map((post) => (
                      <div key={post.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        {getPostStatusIcon(post.status)}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{post.title}</h4>
                          <p className="text-xs text-gray-600">{post.company.name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(post.scheduledAt).toLocaleDateString('nl-NL')} om {formatTime(post.scheduledAt)}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Bekijken
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Bewerken
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Annuleren
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Deze maand</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Geplande posts</span>
                    <Badge variant="secondary">{scheduledPosts.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Gepubliceerde posts</span>
                    <Badge className="bg-green-100 text-green-800">
                      {scheduledPosts.filter(p => p.status === "PUBLISHED").length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Concepten</span>
                    <Badge variant="outline">
                      {scheduledPosts.filter(p => p.status === "DRAFT").length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Snel aan de slag</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/dashboard/posts/new">
                  <Button variant="outline" className="w-full" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Nieuwe post plannen
                  </Button>
                </Link>
                <Link href="/dashboard/posts">
                  <Button variant="outline" className="w-full" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Alle posts bekijken
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}