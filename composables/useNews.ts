import type { NewsApiResponse } from '~/types/news'

export const useNews = async () => {
  const config = useRuntimeConfig()
  const apiKey = config.public.newsApiKey

  const url = 'https://newsapi.org/v2/top-headlines?sources=bbc-news'

  const { data, error } = await useFetch<NewsApiResponse>(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })

  if (error.value) {
    console.error('ニュース取得エラー:', error.value)
  }

  return { data, error }
}

