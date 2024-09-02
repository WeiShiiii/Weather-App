function getWeather() {
    const cityName = document.getElementById('cityInput').value.trim();
    const apiKey = '330544151adf1edc7188f8295e5c1675'; // Use your newly regenerated API key here
    getForecast(cityName, apiKey);
    getCurrentWeather(cityName, apiKey);
}

function getCurrentWeather(cityName, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                throw new Error(data.message);
            }
            displayCurrentWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
            document.getElementById('weatherDisplay').innerHTML = `Error: ${error.message}`;
        });
}

function displayCurrentWeather(data) {
    const weatherHTML = `
        <h3>Current Weather in ${data.name}</h3>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
    `;
    document.getElementById('weatherDisplay').innerHTML = weatherHTML;
}

function getForecast(cityName, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== "200") {
                throw new Error(data.message);
            }
            displayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            document.getElementById('forecastDisplay').innerHTML = `Error: ${error.message}`;
        });
}

function displayForecast(data) {
    let forecastHTML = `<h3>5-Day Forecast</h3>`;
    data.list.forEach((forecast, index) => {
        if (index % 8 === 0) { // Display only daily forecast
            forecastHTML += `
                <div class="forecast-item">
                    <p><strong>Date:</strong> ${forecast.dt_txt}</p>
                    <p><strong>Temperature:</strong> ${forecast.main.temp} °C</p>
                    <p><strong>Weather:</strong> ${forecast.weather[0].description}</p>
                    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather Icon">
                </div>
            `;
        }
    });
    document.getElementById('forecastDisplay').innerHTML = forecastHTML;
}
