function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature-value");
  let cityElement = document.querySelector("#current-city");
  
  let temperature = Math.round(response.data.temperature.current);

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="weather icon">`;

  let weatherDescriptionElement = document.querySelector("#weather-description");
  weatherDescriptionElement.innerHTML = response.data.condition.description;

  // Get and display wind speed and humidity
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`; // Display wind speed

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`; // display humidity
  // Call getForecast with the city name
  getForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "t8o948abdc6be15b83cfbd036b584f29";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "t8o948abdc6be15b83cfbd036b584f29";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
      if (index < 5) {
          forecastHtml += `
          <div class="weather-forecast-day">
              <div class="weather-forecast-date">${formatDay(day.time)}</div>
              <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
              <div class="weather-forecast-temperatures">
                  <div class="weather-forecast-temperature">
                      <strong>${Math.round(day.temperature.maximum)}º</strong>
                  </div>
                  <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
              </div>
          </div>`;
      }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);
 

