export function getFromConfig(key: keyof typeof config) {
  const config = {
    BASE_API_URL: "http://localhost:8000/api/",
    MIN_DESKTOP_WIDTH: "400",
  };

  return config[key] as (typeof config)[keyof typeof config];
}
