"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Share2, Palette, Code, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface StatsCardSvgProps {
  stats: {
    user: {
      name: string
      username: string
    }
    totalArticles: number
    totalReactions: number
    totalComments: number
    mostPopularArticle?: {
      title: string
      public_reactions_count: number
    }
    topTags: Array<{ tag: string; count: number }>
  }
  year: number
  platform: string
}

interface Theme {
  id: string
  name: string
  background: string
  titleColor: string
  textColor: string
  accentColor: string
  logoColor: string
  gradient?: string
}

const themes: Theme[] = [
  {
    id: "default",
    name: "Default",
    background: "#ffffff",
    titleColor: "#3b82f6",
    textColor: "#374151",
    accentColor: "#6b7280",
    logoColor: "#000000",
  },
  {
    id: "dark",
    name: "Dark Mode",
    background: "#1f2937",
    titleColor: "#60a5fa",
    textColor: "#f3f4f6",
    accentColor: "#9ca3af",
    logoColor: "#ffffff",
  },
  {
    id: "gradient-blue",
    name: "Ocean Blue",
    background: "#ffffff",
    titleColor: "#1e40af",
    textColor: "#1e293b",
    accentColor: "#64748b",
    logoColor: "#1e40af",
    gradient: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
  },
  {
    id: "gradient-purple",
    name: "Purple Dream",
    background: "#ffffff",
    titleColor: "#7c3aed",
    textColor: "#374151",
    accentColor: "#6b7280",
    logoColor: "#7c3aed",
    gradient: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
  },
  {
    id: "gradient-green",
    name: "Forest Green",
    background: "#ffffff",
    titleColor: "#059669",
    textColor: "#374151",
    accentColor: "#6b7280",
    logoColor: "#059669",
    gradient: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
  },
  {
    id: "sunset",
    name: "Sunset",
    background: "#ffffff",
    titleColor: "#dc2626",
    textColor: "#374151",
    accentColor: "#6b7280",
    logoColor: "#dc2626",
    gradient: "linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fecaca 100%)",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    background: "#0f0f23",
    titleColor: "#00ff88",
    textColor: "#e0e0e0",
    accentColor: "#888888",
    logoColor: "#00ff88",
  },
  {
    id: "minimal",
    name: "Minimal Gray",
    background: "#f8fafc",
    titleColor: "#1e293b",
    textColor: "#475569",
    accentColor: "#64748b",
    logoColor: "#1e293b",
  },
]

export function StatsCardSvg({ stats, year, platform }: StatsCardSvgProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>("default")
  const [copiedMarkdown, setCopiedMarkdown] = useState(false)
  const [copiedHtml, setCopiedHtml] = useState(false)

  const currentTheme = themes.find((t) => t.id === selectedTheme) || themes[0]

  const topThreeTags = stats.topTags
    .slice(0, 3)
    .map((t) => t.tag)
    .join(", ")

  // Generate the API URL for the stats card
  const generateApiUrl = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://your-domain.com"
    const params = new URLSearchParams({
      username: stats.user.username,
      year: year.toString(),
      theme: selectedTheme,
    })
    return `${baseUrl}/api/stats-card?${params.toString()}`
  }

  // Generate markdown code
  const generateMarkdown = () => {
    const apiUrl = generateApiUrl()
    return `![${stats.user.name}'s Dev.to stats](${apiUrl})`
  }

  // Generate HTML code
  const generateHtml = () => {
    const apiUrl = generateApiUrl()
    return `<img src="${apiUrl}" alt="${stats.user.name}'s Dev.to stats" />`
  }

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(generateMarkdown())
      setCopiedMarkdown(true)
      setTimeout(() => setCopiedMarkdown(false), 2000)
    } catch (err) {
      console.error("Failed to copy markdown:", err)
    }
  }

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(generateHtml())
      setCopiedHtml(true)
      setTimeout(() => setCopiedHtml(false), 2000)
    } catch (err) {
      console.error("Failed to copy HTML:", err)
    }
  }

  const downloadSvg = () => {
    const svgElement = document.getElementById("stats-card-svg")
    if (!svgElement) return

    const svgData = new XMLSerializer().serializeToString(svgElement)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const svgUrl = URL.createObjectURL(svgBlob)

    const downloadLink = document.createElement("a")
    downloadLink.href = svgUrl
    downloadLink.download = `${stats.user.username}-dev-stats-${year}-${selectedTheme}.svg`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(svgUrl)
  }

  const copyToClipboard = async () => {
    const svgElement = document.getElementById("stats-card-svg")
    if (!svgElement) return

    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      canvas.width = 600
      canvas.height = 400

      const svgData = new XMLSerializer().serializeToString(svgElement)
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
      const url = URL.createObjectURL(svgBlob)

      img.crossOrigin = "anonymous"
      img.onload = async () => {
        ctx?.drawImage(img, 0, 0)
        canvas.toBlob(async (blob) => {
          if (blob) {
            try {
              await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
              alert("Stats card copied to clipboard!")
            } catch (err) {
              console.error("Failed to copy to clipboard:", err)
            }
          }
        })
        URL.revokeObjectURL(url)
      }
      img.src = url
    } catch (err) {
      console.error("Failed to copy stats card:", err)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Stats Card
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id}>
                      {theme.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Share2 className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={downloadSvg}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <svg
              id="stats-card-svg"
              width="600"
              height="400"
              viewBox="0 0 600 400"
              xmlns="http://www.w3.org/2000/svg"
              className="border rounded-lg shadow-sm"
            >
              {/* Background with gradient support */}
              <defs>
                {currentTheme.gradient && (
                  <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop
                      offset="0%"
                      stopColor={currentTheme.gradient.match(/#[a-fA-F0-9]{6}/g)?.[0] || currentTheme.background}
                    />
                    <stop
                      offset="50%"
                      stopColor={currentTheme.gradient.match(/#[a-fA-F0-9]{6}/g)?.[1] || currentTheme.background}
                    />
                    <stop
                      offset="100%"
                      stopColor={currentTheme.gradient.match(/#[a-fA-F0-9]{6}/g)?.[2] || currentTheme.background}
                    />
                  </linearGradient>
                )}

                {/* Shadow filter */}
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
                </filter>
              </defs>

              <rect
                width="600"
                height="400"
                fill={currentTheme.gradient ? "url(#bgGradient)" : currentTheme.background}
                rx="12"
                filter="url(#shadow)"
              />

              {/* Decorative elements for certain themes */}
              {selectedTheme === "cyberpunk" && (
                <>
                  <rect x="0" y="0" width="600" height="2" fill={currentTheme.titleColor} opacity="0.8" />
                  <rect x="0" y="398" width="600" height="2" fill={currentTheme.titleColor} opacity="0.8" />
                  <rect x="0" y="0" width="2" height="400" fill={currentTheme.titleColor} opacity="0.8" />
                  <rect x="598" y="0" width="2" height="400" fill={currentTheme.titleColor} opacity="0.8" />
                </>
              )}

              {/* Header */}
              <text
                x="30"
                y="50"
                fontSize="24"
                fontWeight="600"
                fill={currentTheme.titleColor}
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              >
                {stats.user.name}'s year in blogging
              </text>

              {/* DEV Logo */}
              <g transform="translate(520, 20)">
                <svg width="60" height="40" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill={currentTheme.logoColor}
                    d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z"
                  />
                </svg>
              </g>

              {/* Stats */}
              <g
                fontSize="16"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                fill={currentTheme.textColor}
              >
                {/* Total Posts */}
                <text x="30" y="100">
                  <tspan fontSize="18">📝</tspan>
                  <tspan x="60" dy="0">
                    Total Posts: {stats.totalArticles}
                  </tspan>
                </text>

                {/* Posts in Year */}
                <text x="30" y="130">
                  <tspan fontSize="18">📊</tspan>
                  <tspan x="60" dy="0">
                    No of posts ({year}): {stats.totalArticles}
                  </tspan>
                </text>

                {/* Most Reactions */}
                <text x="30" y="160">
                  <tspan fontSize="18">😃</tspan>
                  <tspan x="60" dy="0">
                    Most Reactions: {stats.mostPopularArticle?.public_reactions_count || 0}
                  </tspan>
                </text>

                {/* Most Used Tags */}
                <text x="30" y="190">
                  <tspan fontSize="18">🏷️</tspan>
                  <tspan x="60" dy="0">
                    Most used tags: {topThreeTags || "None"}
                  </tspan>
                </text>

                {/* Most Reacted Post */}
                <text x="30" y="220">
                  <tspan fontSize="18">🔥</tspan>
                  <tspan x="60" dy="0">
                    Most reacted post:
                  </tspan>
                </text>
                <text
                  x="60"
                  y="245"
                  fontSize="14"
                  fill={currentTheme.accentColor}
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                >
                  {stats.mostPopularArticle?.title
                    ? stats.mostPopularArticle.title.length > 60
                      ? stats.mostPopularArticle.title.substring(0, 60) + "..."
                      : stats.mostPopularArticle.title
                    : "No articles found"}
                </text>

                {/* Total Reactions */}
                <text x="30" y="280">
                  <tspan fontSize="18">❤️</tspan>
                  <tspan x="60" dy="0">
                    Total Reactions: {stats.totalReactions}
                  </tspan>
                </text>

                {/* Total Comments */}
                <text x="30" y="310">
                  <tspan fontSize="18">💬</tspan>
                  <tspan x="60" dy="0">
                    Total Comments: {stats.totalComments}
                  </tspan>
                </text>
              </g>

              {/* Footer */}
              <text
                x="30"
                y="360"
                fontSize="12"
                fill={currentTheme.accentColor}
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              >
                Generated by Blog Stats Generator • {year} • {currentTheme.name} Theme
              </text>

              {/* Theme-specific decorative elements */}
              {selectedTheme === "sunset" && <circle cx="550" cy="80" r="15" fill="#fbbf24" opacity="0.6" />}

              {selectedTheme === "gradient-blue" && (
                <>
                  <circle cx="520" cy="350" r="30" fill="#dbeafe" opacity="0.5" />
                  <circle cx="570" cy="320" r="20" fill="#bfdbfe" opacity="0.5" />
                </>
              )}
            </svg>
          </div>

          {/* Theme Preview */}
          <div className="mt-4 p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <div className="w-4 h-4 rounded border" style={{ backgroundColor: currentTheme.background }} />
              <div className="w-4 h-4 rounded border" style={{ backgroundColor: currentTheme.titleColor }} />
              <div className="w-4 h-4 rounded border" style={{ backgroundColor: currentTheme.textColor }} />
              <span className="ml-2">
                <strong>{currentTheme.name}</strong> theme selected
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* README Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            README Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="markdown-code">Markdown (for GitHub README)</Label>
            <div className="flex gap-2">
              <Textarea id="markdown-code" value={generateMarkdown()} readOnly className="font-mono text-sm" rows={2} />
              <Button variant="outline" size="sm" onClick={copyMarkdown} className="shrink-0 bg-transparent">
                {copiedMarkdown ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-slate-600">
              Copy this markdown code and paste it into your GitHub README.md file to showcase your blog stats
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="html-code">HTML (for websites)</Label>
            <div className="flex gap-2">
              <Textarea id="html-code" value={generateHtml()} readOnly className="font-mono text-sm" rows={2} />
              <Button variant="outline" size="sm" onClick={copyHtml} className="shrink-0 bg-transparent">
                {copiedHtml ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-slate-600">
              Use this HTML code to embed the stats card in websites or HTML documents
            </p>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">How to use:</h4>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Copy the markdown or HTML code above</li>
              <li>Paste it into your GitHub README.md or website</li>
              <li>The stats card will automatically update with your latest data</li>
              <li>Change the theme anytime by updating the URL parameter</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
