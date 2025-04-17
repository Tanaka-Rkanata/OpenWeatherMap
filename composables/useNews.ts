import type { NewsApiResponse } from '~/types/news'

export const useNews = async () => {
  const config = useRuntimeConfig()
  const apiKey = config.public.newsApiKey

  const url = `https://gnews.io/api/v4/top-headlines?lang=ja&country=jp&max=10&apikey=${apiKey}`

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

