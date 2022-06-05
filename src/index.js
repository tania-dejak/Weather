let curentDayDate = document.querySelector("#curentDate");
let now = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let formattedDate = currentDay + " " + hours + ":" + minutes;
  return formattedDate;
}
curentDayDate.innerHTML = formatDate(now);

function displayWeatherCondition(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function city(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".form-control");
  let curentCitySearch = document.querySelector("#curentCity");
  if (searchInput.value) {
    function ucFirst(str) {
      if (!str) return str;

      return str[0].toUpperCase() + str.slice(1);
    }

    curentCitySearch.innerHTML = ucFirst(searchInput.value);

    var apiKey = "f15f7f39f58340ebc21e37f8c9db4b70";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
    searchInput.value = "";
  } else {
    return event;
  }
}
var cityValue = document.querySelector("#citySearch");
cityValue.addEventListener("click", city);

function showWeather(response) {
  let curentCitySearch = document.querySelector("#curentCity");
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  curentCitySearch.innerHTML = response.data.name;
}

function retrievePosition(position) {
  let apiKey = "f15f7f39f58340ebc21e37f8c9db4b70";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

var myCity = document.querySelector("#cityCurrent");
myCity.addEventListener("click", getCurrentLocation);
