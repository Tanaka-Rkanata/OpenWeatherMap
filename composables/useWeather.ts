export const useWeather = async (city: string) => {
  const config = useRuntimeConfig()
  const apiKey = config.public.openWeatherApiKey

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`

  const { data, error } = await useFetch(url)

  return { data, error }
}
