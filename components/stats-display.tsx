"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Eye, FileText, Calendar, TrendingUp } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { StatsCardSvg } from "@/components/stats-card-svg"

interface StatsDisplayProps {
  stats: {
    user: {
      name: string
      username: string
      profile_image: string
      summary: string
      website_url?: string
      twitter_username?: string
      github_username?: string
      joined_at: string
    }
    articles: Array<{
      id: number
      title: string
      published_at: string
      public_reactions_count: number
      comments_count: number
      page_views_count: number
      tags: string[]
    }>
    totalArticles: number
    totalReactions: number
    totalComments: number
    totalViews: number
    averageReactions: number
    mostPopularArticle: any
    topTags: Array<{ tag: string; count: number }>
  }
  year: number
  platform: string
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function StatsDisplay({ stats, year, platform }: StatsDisplayProps) {
  const chartConfig = {
    articles: {
      label: "Articles",
      color: "hsl(var(--chart-1))",
    },
    reactions: {
      label: "Reactions",
      color: "hsl(var(--chart-2))",
    },
    comments: {
      label: "Comments",
      color: "hsl(var(--chart-3))",
    },
  }

  const getPlatformName = () => {
    switch (platform) {
      case "devto":
        return "dev.to"
      case "hashnode":
        return "Hashnode"
      case "medium":
        return "Medium"
      default:
        return "Blog"
    }
  }

  // Prepare monthly data
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1
    const monthArticles = stats.articles.filter((article) => {
      const date = new Date(article.published_at)
      return date.getMonth() + 1 === month
    })

    return {
      month: new Date(0, i).toLocaleString("default", { month: "short" }),
      articles: monthArticles.length,
      reactions: monthArticles.reduce((sum, article) => sum + article.public_reactions_count, 0),
      comments: monthArticles.reduce((sum, article) => sum + article.comments_count, 0),
    }
  })

  return (
    <div className="space-y-4">
      {/* User Profile */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={stats.user.profile_image || "/placeholder.svg"} alt={stats.user.name} />
              <AvatarFallback>{stats.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div>
                <h2 className="text-2xl font-bold">{stats.user.name}</h2>
                <p className="text-slate-600">
                  @{stats.user.username} on {getPlatformName()}
                </p>
              </div>
              {stats.user.summary && <p className="text-slate-700">{stats.user.summary}</p>}
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(stats.user.joined_at).toLocaleDateString()}
                </div>
              </div>
              {(stats.user.website_url || stats.user.twitter_username || stats.user.github_username) && (
                <div className="flex items-center gap-4 text-sm text-blue-600">
                  {stats.user.website_url && (
                    <a
                      href={stats.user.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Website
                    </a>
                  )}
                  {stats.user.twitter_username && (
                    <a
                      href={`https://twitter.com/${stats.user.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      @{stats.user.twitter_username}
                    </a>
                  )}
                  {stats.user.github_username && (
                    <a
                      href={`https://github.com/${stats.user.github_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Card SVG */}
      <StatsCardSvg stats={stats} year={year} platform={platform} />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles Published</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalArticles}</div>
            <p className="text-xs text-muted-foreground">in {year}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reactions</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Avg: {Math.round(stats.averageReactions)} per article</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Avg: {Math.round(stats.totalComments / Math.max(stats.totalArticles, 1))} per article
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Avg: {Math.round(stats.totalViews / Math.max(stats.totalArticles, 1))} per article
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Activity Chart */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
            <CardDescription>Articles published throughout {year}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="articles" fill="var(--color-articles)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Tags */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Top Tags</CardTitle>
            <CardDescription>Most used tags in {year}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            {stats.topTags.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.topTags.slice(0, 5)}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      nameKey="tag"
                      label={({ tag, count }) => `${tag} (${count})`}
                      labelLine={false}
                    >
                      {stats.topTags.slice(0, 5).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                <p>No tags found for {year}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Most Popular Article */}
      {stats.mostPopularArticle && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Most Popular Article
            </CardTitle>
            <CardDescription>Your top performing article in {year}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{stats.mostPopularArticle.title}</h3>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {stats.mostPopularArticle.public_reactions_count} reactions
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {stats.mostPopularArticle.comments_count} comments
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {stats.mostPopularArticle.page_views_count} views
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {(stats.mostPopularArticle.tags || []).map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Articles */}
      {stats.articles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Articles</CardTitle>
            <CardDescription>Latest articles from {year}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.articles.slice(0, 5).map((article) => (
                <div key={article.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1 space-y-2">
                    <h4 className="font-medium">{article.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span>{new Date(article.published_at).toLocaleDateString()}</span>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {article.public_reactions_count}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {article.comments_count}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(article.tags || []).slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
