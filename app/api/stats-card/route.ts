import { type NextRequest, NextResponse } from "next/server"
import { fetchUserProfile, fetchUserArticles, type DevtoUserProfile, type DevtoArticle } from "@/lib/devto-api"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const username = searchParams.get("username")
  const year = searchParams.get("year") || new Date().getFullYear().toString()
  const theme = searchParams.get("theme") || "default"

  if (!username) {
    return new NextResponse("Username is required", { status: 400 })
  }

  try {
    // Fetch user data
    const user: DevtoUserProfile = await fetchUserProfile(username)
    const allArticles: DevtoArticle[] = await fetchUserArticles(username)

    // Filter articles by year
    const yearInt = Number.parseInt(year)
    const articlesInYear = allArticles.filter((article) => {
      const publishedYear = new Date(article.published_at).getFullYear()
      return publishedYear === yearInt
    })

    // Calculate statistics
    const totalArticles = articlesInYear.length
    const totalReactions = articlesInYear.reduce((sum, article) => sum + article.public_reactions_count, 0)
    const totalComments = articlesInYear.reduce((sum, article) => sum + article.comments_count, 0)

    // Find most popular article
    const mostPopularArticle =
      articlesInYear.length > 0
        ? articlesInYear.reduce((prev, current) => {
            return prev.public_reactions_count > current.public_reactions_count ? prev : current
          }, articlesInYear[0])
        : null

    // Calculate top tags
    const tagCounts: { [key: string]: number } = {}
    articlesInYear.forEach((article) => {
      const tags = article.tag_list || []
      tags.forEach((tag) => {
        if (typeof tag === "string" && tag.trim()) {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1
        }
      })
    })

    const topTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)

    const topThreeTags = topTags.map((t) => t.tag).join(", ")

    // Theme configurations
    const themes: { [key: string]: any } = {
      default: {
        background: "#ffffff",
        titleColor: "#3b82f6",
        textColor: "#374151",
        accentColor: "#6b7280",
        logoColor: "#000000",
      },
      dark: {
        background: "#1f2937",
        titleColor: "#60a5fa",
        textColor: "#f3f4f6",
        accentColor: "#9ca3af",
        logoColor: "#ffffff",
      },
      "gradient-blue": {
        background: "#ffffff",
        titleColor: "#1e40af",
        textColor: "#1e293b",
        accentColor: "#64748b",
        logoColor: "#1e40af",
        gradient: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
      },
      "gradient-purple": {
        background: "#ffffff",
        titleColor: "#7c3aed",
        textColor: "#374151",
        accentColor: "#6b7280",
        logoColor: "#7c3aed",
        gradient: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
      },
      "gradient-green": {
        background: "#ffffff",
        titleColor: "#059669",
        textColor: "#374151",
        accentColor: "#6b7280",
        logoColor: "#059669",
        gradient: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
      },
      sunset: {
        background: "#ffffff",
        titleColor: "#dc2626",
        textColor: "#374151",
        accentColor: "#6b7280",
        logoColor: "#dc2626",
        gradient: "linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fecaca 100%)",
      },
      cyberpunk: {
        background: "#0f0f23",
        titleColor: "#00ff88",
        textColor: "#e0e0e0",
        accentColor: "#888888",
        logoColor: "#00ff88",
      },
      minimal: {
        background: "#f8fafc",
        titleColor: "#1e293b",
        textColor: "#475569",
        accentColor: "#64748b",
        logoColor: "#1e293b",
      },
    }

    const currentTheme = themes[theme] || themes.default

    // Generate SVG
    const svg = `
      <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          ${
            currentTheme.gradient
              ? `<linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="${currentTheme.gradient.match(/#[a-fA-F0-9]{6}/g)?.[0] || currentTheme.background}" />
                  <stop offset="50%" stop-color="${currentTheme.gradient.match(/#[a-fA-F0-9]{6}/g)?.[1] || currentTheme.background}" />
                  <stop offset="100%" stop-color="${currentTheme.gradient.match(/#[a-fA-F0-9]{6}/g)?.[2] || currentTheme.background}" />
                </linearGradient>`
              : ""
          }
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.1" />
          </filter>
        </defs>
        
        <rect width="600" height="400" fill="${currentTheme.gradient ? "url(#bgGradient)" : currentTheme.background}" rx="12" filter="url(#shadow)" />
        
        ${
          theme === "cyberpunk"
            ? `<rect x="0" y="0" width="600" height="2" fill="${currentTheme.titleColor}" opacity="0.8" />
               <rect x="0" y="398" width="600" height="2" fill="${currentTheme.titleColor}" opacity="0.8" />
               <rect x="0" y="0" width="2" height="400" fill="${currentTheme.titleColor}" opacity="0.8" />
               <rect x="598" y="0" width="2" height="400" fill="${currentTheme.titleColor}" opacity="0.8" />`
            : ""
        }
        
        <text x="30" y="50" font-size="24" font-weight="600" fill="${currentTheme.titleColor}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
          ${user.name}'s year on Dev
        </text>
        
        <g transform="translate(520, 20)">
          <svg width="60" height="40" viewBox="0 0 448 512">
            <path fill="${currentTheme.logoColor}" d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z"/>
          </svg>
        </g>
        
        <g font-size="16" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fill="${currentTheme.textColor}">
          <text x="30" y="100">
            <tspan font-size="18">📝</tspan>
            <tspan x="60" dy="0">Total Posts: ${totalArticles}</tspan>
          </text>
          <text x="30" y="130">
            <tspan font-size="18">📊</tspan>
            <tspan x="60" dy="0">No of posts (${year}): ${totalArticles}</tspan>
          </text>
          <text x="30" y="160">
            <tspan font-size="18">😃</tspan>
            <tspan x="60" dy="0">Most Reactions: ${mostPopularArticle?.public_reactions_count || 0}</tspan>
          </text>
          <text x="30" y="190">
            <tspan font-size="18">🏷️</tspan>
            <tspan x="60" dy="0">Most used tags: ${topThreeTags || "None"}</tspan>
          </text>
          <text x="30" y="220">
            <tspan font-size="18">🔥</tspan>
            <tspan x="60" dy="0">Most reacted post:</tspan>
          </text>
          <text x="60" y="245" font-size="14" fill="${currentTheme.accentColor}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
            ${
              mostPopularArticle?.title
                ? mostPopularArticle.title.length > 60
                  ? mostPopularArticle.title.substring(0, 60) + "..."
                  : mostPopularArticle.title
                : "No articles found"
            }
          </text>
          <text x="30" y="280">
            <tspan font-size="18">❤️</tspan>
            <tspan x="60" dy="0">Total Reactions: ${totalReactions}</tspan>
          </text>
          <text x="30" y="310">
            <tspan font-size="18">💬</tspan>
            <tspan x="60" dy="0">Total Comments: ${totalComments}</tspan>
          </text>
        </g>
        
        <text x="30" y="360" font-size="12" fill="${currentTheme.accentColor}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
          Generated by Dev.to Stats Generator • ${year}
        </text>
        
        ${theme === "sunset" ? `<circle cx="550" cy="80" r="15" fill="#fbbf24" opacity="0.6" />` : ""}
        ${
          theme === "gradient-blue"
            ? `<circle cx="520" cy="350" r="30" fill="#dbeafe" opacity="0.5" />
               <circle cx="570" cy="320" r="20" fill="#bfdbfe" opacity="0.5" />`
            : ""
        }
      </svg>
    `

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error("Error generating stats card:", error)
    return new NextResponse("Error generating stats card", { status: 500 })
  }
}
