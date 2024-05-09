alert("welcome");

function dateTime(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let year = now.getFullYear();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let formattedDate = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;
  return formattedDate;
}

function displayForecast {
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row"`;
    let days = ["Thurs", "Fri", "Sat"];
    days.forEach(function (day)) {
        forecastHTML =  
        forecastHTML + `
    <div class="row">
            <div class="col-2">
                <div class="weather-forecast-date">
                    Thurs
                </div>
                <div id="icon"></div>
                <div class="wearther-forecast-temp">
                    <span class="wearther-forecast-temp-max">18</span>
                    <span class="wearther-forecast-temp-min">12</span>
                </div>
            </div>
        </div>
    `;
    }
    
}

function showWeatherTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let celciusTemperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windspeed");
  let dateElement = document.querySelector("#date");
  let descriptionElement = document.querySelector("#description");
  let icon = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  humidityElement.innerHTML = response.data.temperature.humidity;
  descriptionElement.innerHTML = response.data.condition.description;
  windElement.innerHTML = `${response.data.wind.speed} Km/h`;
  dateElement.innerHTML = dateTime(response.data.time * 1000);
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" />`;
}

function iconDisplay() {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.innerHTML = "#icon";
}

function searchCity(city) {
  let apiKey = "1a747f2d7ac32a100bt13fab8776o6ca";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(showWeatherTemp);
}

displayForecast();

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function showConversion(event) {
  event.preventDefault();
  let farenheitTemperature = (14 * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function searchLocation(position) {
  let apiKey = "1a747f2d7ac32a100bt13fab8776o6ca";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let date = document.querySelector(`#date`);
date.innerHTML = dateTime(new Date());
let searchForm = document.querySelector(".search-form");
searchForm.addEventListener(`submit`, submit);
let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener(`click`, getCurrentLocation);
let changeTemperature = document.querySelector("#fahrenheit-link");
changeTemperature.addEventListener(`click`, showConversion);
let temperature = document.querySelector(`#temperature`);
