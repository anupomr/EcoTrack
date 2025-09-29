export async function fetchCurrentWeather({ lat, lon }, OPENWEATHER_KEY) {
if (!OPENWEATHER_KEY) throw new Error("No OpenWeather API key");
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_KEY}`;
const res = await fetch(url);
if (!res.ok) throw new Error("OpenWeather failed");
const json = await res.json();
return {
temp: json.main.temp,
humidity: json.main.humidity,
wind: json.wind.speed,
description: json.weather[0].description,
};
}


export async function fetchAQI({ lat, lon }, AQICN_TOKEN) {
if (!AQICN_TOKEN) throw new Error("No AQICN token");
const url = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${AQICN_TOKEN}`;
const res = await fetch(url);
if (!res.ok) throw new Error("AQICN failed");
const json = await res.json();
if (json.status !== "ok") throw new Error("AQICN returned error");
return {
aqi: json.data.aqi,
dominentpol: json.data.dominentpol,
iaqi: json.data.iaqi,
};
}