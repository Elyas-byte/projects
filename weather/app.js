const APIkey = "3c4a565a68c84b2ebde64114251803";
const API = "https://api.weatherapi.com/v1/current.json";

async function getJson(url) {
    try {
        const req = new Request(url);
        const response = await fetch(req);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const weather = await response.json();
        return weather;
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
    }
}

async function displayWeather(search) {
    const fullURL = `${API}?key=${APIkey}&q=${encodeURIComponent(search)}&aqi=no`;
    const weather = await getJson(fullURL);

    if (weather) {
        document.getElementById("weather-container").style.display = "inline-block";
        document.getElementById("locationName").textContent = `${weather.location.name}, ${weather.location.country}`;
        document.getElementById("temperature").textContent = weather.current.temp_c;
        document.getElementById("condition").textContent = weather.current.condition.text;
        document.getElementById("wind").textContent = weather.current.wind_kph;
    } else {
        alert("Weather data could not be retrieved. Please check the location name.");
    }
}

function handleSearch() {
    const location = document.getElementById("locationInput").value.trim();
    if (location) {
        displayWeather(location);
    } else {
        alert("Please enter a location.");
    }
}
