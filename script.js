const apiKey = "8e63bedd05b094d0af7ec7d36d34cb2b";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city = "delhi") {
  try {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    console.log(data);

    if (data.main) {
      document.querySelector(".city").innerText = data.name;
      document.querySelector(".temp").innerText =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerText = data.main.humidity + "%";
      document.querySelector(".wind").innerText = data.wind.speed + " km/h";

      const weatherMain = data.weather[0].main;
      if (weatherMain === "Clouds") weatherIcon.src = "images/clouds.png";
      else if (weatherMain === "Clear") weatherIcon.src = "images/clear.png";
      else if (weatherMain === "Rain") weatherIcon.src = "images/rain.png";
      else if (weatherMain === "Drizzle") weatherIcon.src = "images/drizzle.png";
      else if (weatherMain === "Mist") weatherIcon.src = "images/mist.png";
      else if (weatherMain === "Snow") weatherIcon.src = "images/snow.png";
      

      
    } else {
      throw new Error("Weather data not available");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.querySelector(".city").innerText = "City not found";
    document.querySelector(".temp").innerText = "";
    document.querySelector(".humidity").innerText = "";
    document.querySelector(".wind").innerText = "";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  getWeather(city);
  document.querySelector(".weather").style.visibility = "visible";
});

getWeather();
