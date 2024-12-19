const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const Card = document.querySelector(".card");
const CityDisplay = document.querySelector(".CityDisplay");
const tempDisplay = document.querySelector(".tempDisplay");
const humidityDisplay = document.querySelector(".humidityDisplay");
const descDisplay = document.querySelector(".descDisplay");
const WeatherEmoji = document.querySelector(".WeatherEmoji");
const errorDisplay = document.querySelector(".errorDisplay");
const apiKey = "3a8b8c2594a95fb4e3dc52952f16c196";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  // Show error if no input
  if (!city) {
    displayError("Please enter a city.");
    return;
  }

  // Hide error and proceed
  hideError();

  try {
    const weatherData = await getWeatherData(city);
    displayWeatherInfo(weatherData);
  } catch (error) {
    console.error(error);
    displayError("Failed to fetch weather data. Please try again.");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  const { name, main, weather } = data;
  CityDisplay.textContent = name;
  tempDisplay.textContent = `${Math.round(main.temp)}°F`;
  humidityDisplay.textContent = `Humidity: ${main.humidity}%`;
  descDisplay.textContent = weather[0].description;
  WeatherEmoji.textContent = getWeatherEmoji(weather[0].id);

  Card.style.display = "block";
}

function getWeatherEmoji(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return "⛈️"; // Thunderstorm
  if (weatherId >= 300 && weatherId < 500) return "🌦️"; // Drizzle
  if (weatherId >= 500 && weatherId < 600) return "🌧️"; // Rain
  if (weatherId >= 600 && weatherId < 700) return "❄️"; // Snow
  if (weatherId >= 700 && weatherId < 800) return "🌫️"; // Fog
  if (weatherId === 800) return "☀️"; // Clear
  if (weatherId > 800) return "☁️"; // Clouds
  return "❓"; // Unknown
}

function displayError(message) {
  errorDisplay.textContent = message;
  errorDisplay.classList.remove("d-none");
  errorDisplay.style.display = "block";

  Card.style.display = "none";
}

function hideError() {
  errorDisplay.classList.add("d-none");
  errorDisplay.style.display = "none";
}
