import axios from "axios"

export interface DevtoUserProfile {
  name: string
  username: string
  profile_image: string
  profile_image_90: string
  summary: string
  website_url: string | null
  twitter_username: string | null
  github_username: string | null
  joined_at: string
}

export interface DevtoArticle {
  id: number
  title: string
  description: string
  readable_publish_date: string
  slug: string
  path: string
  url: string
  comments_count: number
  public_reactions_count: number
  tag_list: string[]
  published_at: string
  page_views_count?: number
}

const API_BASE = "https://dev.to/api"

export async function fetchUserProfile(username: string): Promise<DevtoUserProfile> {
  const response = await axios.get<DevtoUserProfile>(`${API_BASE}/users/by_username`, {
    params: { url: username },
  })
  return response.data
}

export async function fetchUserArticles(username: string): Promise<DevtoArticle[]> {
  const response = await axios.get<DevtoArticle[]>(`${API_BASE}/articles`, {
    params: { username, per_page: 1000 },
  })
  return response.data
}
