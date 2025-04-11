export interface NewsArticle {
  title: string
  url: string
  author: string | null
  publishedAt: string
  source: {
    id: string | null
    name: string
  }
  description: string
  urlToImage: string
  content: string
}

export interface NewsApiResponse {
  status: string
  totalResults: number
  articles: NewsArticle[]
}
