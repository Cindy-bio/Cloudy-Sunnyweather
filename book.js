function displayWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let cityName = response.data.city;
  let h1Element = document.querySelector("h1");
  h1Element.innerHTML = `${cityName}`;
  let sunnyElement = document.querySelectorAll("#sunny");
  sunnyElement.innerHTML = `${temperature}℃`;
}

function searchCity(event) {
  event.preventDefault();
  let findInputElement = document.querySelector("#find-input");
  let cityName = findInputElement.value;
  let h1Element = document.querySelector("h1");
  h1Element.innerHTML = cityName;

  fetchWeatherData(cityName);
}

let locationForm = document.querySelector("#location");
locationForm.addEventListener("submit", searchCity);

function fetchWeatherData(cityName) {
  let apiKey = `59co603b2aafffbe78f0b45aa8t9fe03`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function updateDateTime() {
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
  let dateCastingElement = document.querySelector("#dateCasting");
  dateCastingElement.innerHTML = `${day} ${hour}:${minutes},`;
}
updateDateTime();




