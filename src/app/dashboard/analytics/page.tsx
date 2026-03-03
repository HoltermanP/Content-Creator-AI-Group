"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MessageSquare,
  Heart,
  Share,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Clock,
  Award,
  Zap
} from "lucide-react";
import Link from "next/link";
import WorkflowHeader from "@/components/WorkflowHeader";

interface AnalyticsData {
  overview: {
    totalPosts: number;
    totalViews: number;
    totalEngagements: number;
    totalClicks: number;
    avgEngagementRate: number;
  };
  performance: {
    viewsOverTime: Array<{ date: string; views: number; engagements: number }>;
    topPosts: Array<{
      id: string;
      title: string;
      views: number;
      engagements: number;
      engagementRate: number;
      publishedAt: string;
      company: string;
    }>;
    contentTypes: Array<{
      type: string;
      count: number;
      avgEngagement: number;
      totalViews: number;
    }>;
    timePerformance: Array<{
      hour: number;
      avgEngagement: number;
      postCount: number;
    }>;
  };
  insights: {
    bestPerformingDay: string;
    bestPerformingHour: number;
    topTopic: string;
    recommendedActions: string[];
  };
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedCompany, setSelectedCompany] = useState("all");

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    // TODO: Fetch analytics from API
    // For new users, show empty analytics
    const mockAnalytics: AnalyticsData = {
      overview: {
        totalPosts: 0,
        totalViews: 0,
        totalEngagements: 0,
        totalClicks: 0,
        avgEngagementRate: 0
      },
      performance: {
        viewsOverTime: [],
        topPosts: [],
        contentTypes: [],
        timePerformance: []
      },
      insights: {
        bestPerformingDay: "",
        bestPerformingHour: 0,
        topTopic: "",
        recommendedActions: []
      }
    };

    setAnalytics(mockAnalytics);
    setLoading(false);
  }, [session, status, router]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const formatPercentage = (num: number) => {
    return num.toFixed(1) + "%";
  };

  const getEngagementColor = (rate: number) => {
    if (rate >= 7) return "text-green-600";
    if (rate >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading || !analytics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Analytics laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <WorkflowHeader currentPage="analytics" />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Analyseer de performance van je LinkedIn content</p>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totaal Posts</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.overview.totalPosts}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% vs vorige periode
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totaal Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(analytics.overview.totalViews)}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +18% vs vorige periode
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagements</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(analytics.overview.totalEngagements)}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +25% vs vorige periode
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gem. Engagement Rate</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPercentage(analytics.overview.avgEngagementRate)}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +0.8% vs vorige periode
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="content">Content Analyse</TabsTrigger>
            <TabsTrigger value="insights">Insights & Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Views Over Time Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Views & Engagements Over Time</CardTitle>
                  <CardDescription>Ontwikkeling van je content performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Chart zou hier komen</p>
                      <p className="text-sm text-gray-500">Views: {formatNumber(analytics.overview.totalViews)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Posts */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Posts</CardTitle>
                  <CardDescription>Je best presterende content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.performance.topPosts.map((post, index) => (
                      <div key={post.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{post.title}</h4>
                          <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                            <span>{formatNumber(post.views)} views</span>
                            <span>{formatNumber(post.engagements)} engagements</span>
                            <span className={getEngagementColor(post.engagementRate)}>
                              {formatPercentage(post.engagementRate)} rate
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Content Types Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Content Types Performance</CardTitle>
                  <CardDescription>Welke content types werken het beste</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.performance.contentTypes.map((type) => (
                      <div key={type.type} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{type.type}</span>
                          <span className="text-sm text-gray-600">{type.count} posts</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Progress
                            value={(type.avgEngagement / 10) * 100}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium min-w-12">
                            {formatPercentage(type.avgEngagement)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          {formatNumber(type.totalViews)} totaal views
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Best Posting Times */}
              <Card>
                <CardHeader>
                  <CardTitle>Beste Posting Tijden</CardTitle>
                  <CardDescription>Wanneer je content het beste presteert</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.performance.timePerformance
                      .sort((a, b) => b.avgEngagement - a.avgEngagement)
                      .slice(0, 5)
                      .map((time) => (
                        <div key={time.hour} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">{time.hour}:00</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{formatPercentage(time.avgEngagement)}</div>
                            <div className="text-xs text-gray-600">{time.postCount} posts</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Key Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                  <CardDescription>Belangrijke bevindingen uit je data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                      <Award className="h-5 w-5 text-green-600" />
                      <div>
                        <h4 className="font-medium text-green-800">Beste dag</h4>
                        <p className="text-sm text-green-700">{analytics.insights.bestPerformingDay}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-blue-800">Beste tijd</h4>
                        <p className="text-sm text-blue-700">{analytics.insights.bestPerformingHour}:00 uur</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                      <Target className="h-5 w-5 text-purple-600" />
                      <div>
                        <h4 className="font-medium text-purple-800">Top topic</h4>
                        <p className="text-sm text-purple-700">{analytics.insights.topTopic}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Aanbevelingen</CardTitle>
                  <CardDescription>Tips om je performance te verbeteren</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.insights.recommendedActions.map((action, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <Zap className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-800">{action}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}