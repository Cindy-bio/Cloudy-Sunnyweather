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
  
  
  console.log(response.data);
  
  h1Element.innerHTML = `${cityName}`;

  dateCastingElement.innerHTML = updateDateTime(date);
  tellWeatherElement.innerHTML = response.data.condition.description;
  joyElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
  digitsElement.innerHTML = Math.round(digits);
  humidityElement.innerHTML = `${response.data.temperature.humidity}`;
  windElement.innerHTML = `${response.data.wind.speed}`;
}

function updateDateTime(date) {
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
  let apiKey = "59co603b2aafffbe78f0b45aa8t9fe03";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;    
  axios.get(apiUrl).then(displayWeather);
}




