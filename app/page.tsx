"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, TrendingUp, BookOpen, Github, ExternalLink } from "lucide-react"
import { StatsDisplay } from "@/components/stats-display"
import { Footer } from "@/components/footer"

interface BlogStats {
  user: {
    name: string
    username: string
    profile_image: string
    summary: string
    location: string
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

export default function BlogStatsApp() {
  const [platform, setPlatform] = useState("devto")
  const [username, setUsername] = useState("")
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<BlogStats | null>(null)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) {
      setError("Please enter a username")
      return
    }

    setLoading(true)
    setError("")
    setStats(null)

    try {
      const response = await fetch(`/api/${platform}-stats?username=${encodeURIComponent(username)}&year=${year}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch stats")
      }

      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const getPlatformInfo = () => {
    switch (platform) {
      case "devto":
        return {
          name: "Dev.to",
          placeholder: "e.g., ben",
          tips: [
            '• Try usernames like "ben", "jess", or "andy"',
            "• Stats are available from 2016 onwards",
            "• Data includes articles, reactions, and comments",
            "• Charts show monthly activity patterns",
          ],
        }
      case "hashnode":
        return {
          name: "Hashnode",
          placeholder: "e.g., username",
          tips: [
            "• Coming soon!",
            "• Will include articles and engagement metrics",
            "• Support for custom domains",
            "• Publication statistics",
          ],
        }
      case "medium":
        return {
          name: "Medium",
          placeholder: "e.g., @username",
          tips: [
            "• Coming soon!",
            "• Will include claps and responses",
            "• Publication analytics",
            "• Reading time statistics",
          ],
        }
      default:
        return {
          name: "Dev.to",
          placeholder: "e.g., ben",
          tips: ["• Select a platform to get started"],
        }
    }
  }

  const platformInfo = getPlatformInfo()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Blog Stats Generator</h1>
            <a
              href="https://github.com/yourusername/blog-stats-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
            >
              <Github className="w-4 h-4" />
              Star
            </a>
          </div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Generate comprehensive statistics for your blog across multiple platforms. Analyze your writing activity,
            engagement metrics, and growth patterns.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Dev.to Available
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              Hashnode Coming Soon
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              Medium Coming Soon
            </span>
          </div>
        </div>

        {/* Promotional Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* GitHub Repository Card */}
          <Card className="border-2 border-slate-200 hover:border-slate-300 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center">
                  <Github className="text-white w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">Open Source Project</h3>
                  <p className="text-slate-600 text-sm mb-3">
                    Explore the code, contribute, or fork this project on GitHub
                  </p>
                  <a
                    href="https://github.com/yourusername/blog-stats-generator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Hunt Card */}
          <Card className="border-2 border-orange-200 hover:border-orange-300 transition-colors bg-gradient-to-br from-orange-50 to-red-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">PH</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">Featured on Product Hunt</h3>
                  <p className="text-slate-600 text-sm mb-3">
                    Support us with an upvote and help others discover this tool
                  </p>
                  <a
                    href="https://www.producthunt.com/posts/blog-stats-generator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all text-sm font-medium"
                  >
                    🚀 Upvote on Product Hunt
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
          {/* Left Side - Input Form */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Generate Stats
                  </CardTitle>
                  <CardDescription>
                    Select a platform and enter your username to analyze your blog activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="platform">Platform</Label>
                      <Select value={platform} onValueChange={setPlatform}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="devto">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-black rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">D</span>
                              </div>
                              Dev.to
                            </div>
                          </SelectItem>
                          <SelectItem value="hashnode" disabled>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">H</span>
                              </div>
                              Hashnode (Coming Soon)
                            </div>
                          </SelectItem>
                          <SelectItem value="medium" disabled>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-green-600 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">M</span>
                              </div>
                              Medium (Coming Soon)
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder={platformInfo.placeholder}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading || platform !== "devto"}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        type="number"
                        min="2016"
                        max={new Date().getFullYear()}
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        disabled={loading || platform !== "devto"}
                      />
                    </div>
                    {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}
                    <Button type="submit" className="w-full" disabled={loading || platform !== "devto"}>
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating Stats...
                        </>
                      ) : (
                        `Generate ${platformInfo.name} Stats`
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Platform Tips */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">{platformInfo.name} Tips</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600 space-y-2">
                  {platformInfo.tips.map((tip, index) => (
                    <p key={index}>{tip}</p>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Side - Stats Display */}
          <div className="lg:col-span-8 xl:col-span-9">
            {loading && (
              <div className="flex items-center justify-center h-96">
                <div className="text-center space-y-4">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-slate-600" />
                  <p className="text-slate-600">Fetching {platformInfo.name} stats...</p>
                </div>
              </div>
            )}

            {!loading && !stats && !error && (
              <div className="flex items-center justify-center h-96">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto">
                    <BookOpen className="w-8 h-8 text-slate-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-700">Ready to Generate Blog Stats</h3>
                    <p className="text-slate-500">Select a platform and enter your username to get started</p>
                  </div>
                </div>
              </div>
            )}

            {stats && <StatsDisplay stats={stats} year={Number.parseInt(year)} platform={platform} />}
          </div>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
