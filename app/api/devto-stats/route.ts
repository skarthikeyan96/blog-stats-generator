import { type NextRequest, NextResponse } from "next/server"
import { fetchUserProfile, fetchUserArticles, type DevtoUserProfile, type DevtoArticle } from "@/lib/devto-api"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const username = searchParams.get("username")
  const year = searchParams.get("year") || new Date().getFullYear().toString()

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  try {
    // Fetch user data using axios
    const user: DevtoUserProfile = await fetchUserProfile(username)

    // Fetch user's articles using axios
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
    const totalViews = articlesInYear.reduce((sum, article) => sum + (article.page_views_count || 0), 0)
    const averageReactions = totalArticles > 0 ? totalReactions / totalArticles : 0

    // Find most popular article - with fallback for empty array
    const mostPopularArticle =
      articlesInYear.length > 0
        ? articlesInYear.reduce((prev, current) => {
            return prev.public_reactions_count > current.public_reactions_count ? prev : current
          }, articlesInYear[0])
        : null

    // Calculate top tags - using tag_list instead of tags
    const tagCounts: { [key: string]: number } = {}
    articlesInYear.forEach((article) => {
      // Use tag_list which is guaranteed to be an array
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
      .slice(0, 10)

    const stats = {
      user: {
        name: user.name,
        username: user.username,
        profile_image: user.profile_image,
        summary: user.summary || "",
        location: "", // Not available in the new interface
        joined_at: user.joined_at,
        website_url: user.website_url,
        twitter_username: user.twitter_username,
        github_username: user.github_username,
      },
      articles: articlesInYear
        .map((article) => ({
          ...article,
          tags: article.tag_list, // Map tag_list to tags for compatibility with frontend
        }))
        .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()),
      totalArticles,
      totalReactions,
      totalComments,
      totalViews,
      averageReactions,
      mostPopularArticle: mostPopularArticle
        ? {
            ...mostPopularArticle,
            tags: mostPopularArticle.tag_list,
          }
        : null,
      topTags,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching dev.to stats:", error)

    // Handle axios errors specifically
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as any
      if (axiosError.response?.status === 404) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }
    }

    return NextResponse.json({ error: "Failed to fetch dev.to stats. Please try again." }, { status: 500 })
  }
}
