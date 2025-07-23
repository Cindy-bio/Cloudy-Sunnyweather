function displayWeather(response) {
  let h1Element = document.querySelector("h1");
  let cityName = response.data.city;
  let dateCastingElement = document.querySelector("#dateCasting");
  let date = new Date(response.data.time * 1000);
  let tellWeatherElement = document.querySelector("#tellWeather");
  let joyElement = document.querySelector("#joy")
  let digitsElement = document.querySelector("#digits");
  let digits = response.data.temperature.current;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  h1Element.innerHTML = `${cityName}`;
  dateCastingElement.innerHTML = updateDateTime(date);
  tellWeatherElement.innerHTML = response.data.condition.description;
  joyElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
  digitsElement.innerHTML = Math.round(digits);
  humidityElement.innerHTML = `${response.data.temperature.humidity}`;
  windElement.innerHTML = `${response.data.wind.speed}`;
  fetchForecast(response.data.city); 
}

function updateDateTime(_date) {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${day} ${hour}:${minutes}`;
}

function fetchWeatherData(cityName) {
  let apiKey = "59co603b2aafffbe78f0b45aa8t9fe03";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function searchCity(event) {
  event.preventDefault();
  let findInputElement = document.querySelector("#find-input");
  let cityName = findInputElement.value;
  let h1Element = document.querySelector("h1");
  h1Element.innerHTML = cityName;
  
    fetchWeatherData(cityName);
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function fetchForecast(cityName) {
  let apiKey = "59co603b2aafffbe78f0b45aa8t9fe03";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let fluffyForecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
     fluffyForecastHtml = 
      fluffyForecastHtml +
      `
      <div class="fluffy-forecast-day">
        <div class="fluffy-forecast-date">${formatDate(day.time)}</div>
        <img src="${day.condition.icon_url}"/>
        <div class="fluffy-forecast-temperatures">
          <div class="fluffy-forecast-temperature">
           <strong>${Math.round(day.temperature.maximum)}° </strong></div>
          <div class="fluffy-forecast-temperature"> ${Math.round(day.temperature.minimum)}° </div>
        </div>
      </div>        
    `;
    }
  });

  let fluffyForecast = document.querySelector("#fluffyForecast");
  fluffyForecast.innerHTML = fluffyForecastHtml;

  
}

let locationForm = document.querySelector("#location");
locationForm.addEventListener("submit", searchCity);

fetchWeatherData("Johannesburg");






