type CityLocation = {
  city: string
  lat: number
  lon: number
}

export const useCity = async (input: string): Promise<{ lat: number; lon: number } | null> => {
  const trimmed = input.trim().toLowerCase()

  // ① パターン辞書の読み込み（全表記 → 英語都市名）
  const patternRes = await fetch('/prefecture_pattern_map_final.json')
  const patternMap: Record<string, string> = await patternRes.json()
  

  const matchedCityName = patternMap[trimmed]
  if (!matchedCityName) {
    console.warn(`入力「${input}」に対応する都市名が見つかりませんでした`)
    return null
  }

  // ② 緯度・経度辞書の読み込み
  const cityRes = await fetch('/japan_city_locations.json')
  const cities: CityLocation[] = await cityRes.json()

  const city = cities.find((c) =>
    c.city.toLowerCase() === matchedCityName.toLowerCase()
  )

  if (!city) {
    console.warn(`都市「${matchedCityName}」が見つかりませんでした`)
    return null
  }

  return { lat: city.lat, lon: city.lon }
}