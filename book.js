let weatherData = [
  {
    city: "Paris",
    temp: 19.7,
    humidity: 80,
  },
  {
    city: "Tokyo",
    temp: 17.3,
    humidity: 50,
  },
  {
    city: "Lisbon",
    temp: 30.2,
    humidity: 20,
  },
  {
    city: "San Francisco",
    temp: 20.9,
    humidity: 100,
  },
  {
    city: "Oslo",
    temp: -5,
    humidity: 20,
  },
];

let city = prompt("Enter a city");
let foundCity = weatherData.find(
  (data) => data.city.toLowerCase() === city.toLowerCase()
);
if (foundCity) {
  let temp = Math.round(foundCity.temp);
  let humidity = foundCity.humidity;
  let celsiusTemp = Math.round(temp);
  let fahrenheitTemp = Math.round((temp * 9) / 5 + 32);

  alert(
    `It is currently ${celsiusTemp}℃ (${fahrenheitTemp}) in ${city} with a humidity of ${humidity}%.`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try searching for ${city} on Microsoft weather.`
  );
}

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
  dateCastingElement.innerHTML = `${day} ${hour}:${minutes}`;
}
updateDateTime();

function fetchWeatherData(cityName) {
  let apiKey = `59co603b2aafffbe78f0b45aa8t9fe03`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}


