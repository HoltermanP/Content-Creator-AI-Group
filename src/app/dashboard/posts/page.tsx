"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sparkles,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Calendar,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  BarChart3
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

interface Post {
  id: string;
  title: string;
  content: string;
  status: "DRAFT" | "SCHEDULED" | "PUBLISHED" | "FAILED";
  scheduledAt?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  company: {
    id: string;
    name: string;
  };
  linkedinUrl?: string;
  imageUrl?: string;
}

export default function PostsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [companyFilter, setCompanyFilter] = useState<string>("ALL");

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    async function loadPosts() {
      try {
        const res = await fetch("/api/calendar/posts", { credentials: "include" });
        const data = await res.json().catch(() => ({}));
        if (res.ok && Array.isArray(data.posts)) {
          setPosts(
            data.posts.map((p: any) => ({
              id: p.id,
              title: p.title,
              content: p.content,
              status: p.status,
              scheduledAt: p.scheduledAt ?? undefined,
              publishedAt: p.publishedAt ?? undefined,
              createdAt: p.createdAt,
              updatedAt: p.updatedAt,
              company: p.company ? { id: p.company.id, name: p.company.name } : { id: "", name: "—" },
              linkedinUrl: p.linkedinUrl,
              imageUrl: p.imageUrl,
            }))
          );
        }
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [session, status, router]);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || post.status === statusFilter;
    const matchesCompany = companyFilter === "ALL" || post.company.id === companyFilter;

    return matchesSearch && matchesStatus && matchesCompany;
  });

  const getStatusIcon = (status: string) => {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Gepubliceerd</Badge>;
      case "SCHEDULED":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Gepland</Badge>;
      case "DRAFT":
        return <Badge variant="outline">Concept</Badge>;
      case "FAILED":
        return <Badge variant="destructive">Mislukt</Badge>;
      default:
        return <Badge variant="outline">Onbekend</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPostsByStatus = (status: string) => {
    return filteredPosts.filter(post => post.status === status);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Posts laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <WorkflowHeader currentPage="posts" />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Beheer</h1>
            <p className="text-gray-600">Beheer al je LinkedIn posts en content</p>
          </div>
          <Link href="/dashboard/posts/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nieuwe Post
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Zoek in posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter op status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Alle statussen</SelectItem>
                  <SelectItem value="DRAFT">Concept</SelectItem>
                  <SelectItem value="SCHEDULED">Gepland</SelectItem>
                  <SelectItem value="PUBLISHED">Gepubliceerd</SelectItem>
                  <SelectItem value="FAILED">Mislukt</SelectItem>
                </SelectContent>
              </Select>
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter op bedrijf" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Alle bedrijven</SelectItem>
                  <SelectItem value="1">TechCorp Netherlands</SelectItem>
                  <SelectItem value="2">De Vries Consultancy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Posts Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Alles ({filteredPosts.length})</TabsTrigger>
            <TabsTrigger value="draft">Concept ({getPostsByStatus("DRAFT").length})</TabsTrigger>
            <TabsTrigger value="scheduled">Gepland ({getPostsByStatus("SCHEDULED").length})</TabsTrigger>
            <TabsTrigger value="published">Gepubliceerd ({getPostsByStatus("PUBLISHED").length})</TabsTrigger>
            <TabsTrigger value="failed">Mislukt ({getPostsByStatus("FAILED").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredPosts.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Geen posts gevonden</h3>
                  <p className="text-gray-600 mb-4">Er zijn geen posts die voldoen aan je zoekcriteria.</p>
                  <Link href="/dashboard/posts/new">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Maak je eerste post
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getStatusIcon(post.status)}
                            <h3 className="font-semibold text-lg">{post.title}</h3>
                            {getStatusBadge(post.status)}
                          </div>
                          <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{post.company.name}</span>
                            <span>•</span>
                            <span>Aangemaakt: {formatDate(post.createdAt)}</span>
                            {post.publishedAt && (
                              <>
                                <span>•</span>
                                <span>Gepubliceerd: {formatDate(post.publishedAt)}</span>
                              </>
                            )}
                            {post.scheduledAt && (
                              <>
                                <span>•</span>
                                <span>Gepland: {formatDate(post.scheduledAt)}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acties</DropdownMenuLabel>
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
                              <Trash2 className="mr-2 h-4 w-4" />
                              Verwijderen
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>

          {/* Other tabs with similar content but filtered */}
          <TabsContent value="draft" className="space-y-4">
            {getPostsByStatus("DRAFT").map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(post.status)}
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        {getStatusBadge(post.status)}
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{post.company.name}</span>
                        <span>•</span>
                        <span>Aangemaakt: {formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Bewerken
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Play className="mr-2 h-4 w-4" />
                          Publiceren
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Verwijderen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Similar content for other tabs */}
          <TabsContent value="scheduled" className="space-y-4">
            {getPostsByStatus("SCHEDULED").map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(post.status)}
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        {getStatusBadge(post.status)}
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{post.company.name}</span>
                        <span>•</span>
                        <span>Gepland: {formatDate(post.scheduledAt!)}</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Bewerken
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Analytics
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Verwijderen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="published" className="space-y-4">
            {getPostsByStatus("PUBLISHED").map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(post.status)}
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        {getStatusBadge(post.status)}
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{post.company.name}</span>
                        <span>•</span>
                        <span>Gepubliceerd: {formatDate(post.publishedAt!)}</span>
                        {post.linkedinUrl && (
                          <>
                            <span>•</span>
                            <a href={post.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              Bekijken op LinkedIn
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Analytics bekijken
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Nogmaals posten
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Verwijderen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="failed" className="space-y-4">
            {getPostsByStatus("FAILED").map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow border-red-200">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(post.status)}
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        {getStatusBadge(post.status)}
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{post.company.name}</span>
                        <span>•</span>
                        <span>Aangemaakt: {formatDate(post.createdAt)}</span>
                      </div>
                      <div className="mt-3 p-3 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-800">
                          Publicatie mislukt. Je kunt de post bewerken en opnieuw proberen.
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Play className="mr-2 h-4 w-4" />
                          Opnieuw proberen
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Bewerken
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Verwijderen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}