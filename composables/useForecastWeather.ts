export const useForecastWeather = async (city: string) => {
  const location = await useCity(city)
  if (!location) {
    return {
      current: null,
      dailyForecasts: [],
      error: '都市が見つかりません'
    }
  }

  const config = useRuntimeConfig()
  const apiKey = config.public.openWeatherApiKey

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&lang=ja&appid=${apiKey}`

  const { data, error } = await useFetch<any>(url)

  const forecasts = data.value?.list ?? []

  // 今日の天気
  const current = forecasts[0]

  // 一週間の天気
  const dailyForecasts = forecasts.filter((item: any) => item.dt_txt.includes('12:00:00')).slice(0, 5)

  return {
    current,
    dailyForecasts,
    error: error.value
  }
}




