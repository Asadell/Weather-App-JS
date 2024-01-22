const weatherForm = document.querySelector('.weatherForm');
const card = document.querySelector('.card');
const cityInput =  document.querySelector('#cityInput');
const key = '42dc1548ecc518243f9c8390b653ec28';

weatherForm.addEventListener("submit", async event => {
  event.preventDefault();
  console.log('uo');

  const city = cityInput.value;

  if (city) {
    const weatherData = await getWeatherData(city);
    displayWeatherData(weatherData);
  } else {
    displayError('Blum ada inputannyaa');
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`

  const response = await fetch(apiUrl);

  if(!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

function displayWeatherData(weatherData) {
  // console.log(weatherData);
  const {name: city,
          main: {temp, humidity},
          weather: [{description, id}]} = weatherData;
  
  card.textContent = '';
  card.style.display = 'flex';

  const cityDisplay = document.createElement('h1');
  cityDisplay.textContent = city;
  cityDisplay.classList.add('cityDisplay');

  const tempDisplay = document.createElement('p');
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  tempDisplay.classList.add('tempDisplay');
  
  const humidityDisplay = document.createElement('p');
  humidityDisplay.textContent = humidity;
  humidityDisplay.classList.add('humidityDisplay');
  
  const descDisplay = document.createElement('p');
  descDisplay.textContent = description;
  descDisplay.classList.add('descDisplay');
  
  const weatherDisplay = document.createElement('p');
  weatherDisplay.textContent = getWeatherEmoji(id);
  weatherDisplay.classList.add('weatherDisplay');
  
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherDisplay);
}

function getWeatherEmoji(weatherId) {
  switch(true) {
    case (weatherId >= 200 && weatherId < 300):
      return "⛈";
    case (weatherId >= 300 && weatherId < 400):
      return "🌧";
    case (weatherId >= 500 && weatherId < 600):
      return "🌧";
    case (weatherId >= 600 && weatherId < 700):
      return "❄";
    case (weatherId >= 700 && weatherId < 800):
      return "🌫";
    case (weatherId === 800):
      return "☀";
    case (weatherId >= 801 && weatherId < 810):
      return "☁";
    default:
      return "❓";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement('p');
  errorDisplay.textContent = message;
  errorDisplay.classList.add('errorDisplay');

  card.textContent = "";
  card.style.display = 'flex'; 
  card.appendChild(errorDisplay);
}

