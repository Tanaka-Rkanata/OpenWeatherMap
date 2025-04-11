export type WeatherResponse = {
  name: string
  weather: { description: string; icon: string }[]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
    pressure: number
  }
  wind: {
    speed: number
    deg: number
  }
  clouds: { all: number }
  visibility: number
  sys: {
    sunrise: number
    sunset: number
  }
}
