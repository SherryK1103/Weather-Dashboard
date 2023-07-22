function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  const city = searchInput.value.trim();

  if (city === '') {
    alert('Please enter a city name.');
    return;
  }

  saveCityToLocalStorage(city);

  getGeocodingData(city)
}

function saveCityToLocalStorage(city) {
  let previousCities = localStorage.getItem('previousCities') || '[]';
  previousCities = JSON.parse(previousCities);

  // Add the new city to the list of prvious cities (remove duplicates)
  if (!previousCities.includes(city)) {
    previousCities.push(city);
  }

  // Save the updated list back to localStorage
  localStorage.setItem('previousCities', JSON.stringify(previousCities));
}

// Function to populate previous searches on the webpage
function populatePreviousSearches() {
  const previousCities = JSON.parse(localStorage.getItem('previousCities')) || [];

  const previousSearchesElement = document.getElementById('previousSearches');

  previousCities.forEach(city => {
    const listItem = document.createElement('li');
    listItem.textContent = city;
    previousSearchesElement.appendChild(listItem);
  });
}

function currentDay(weatherData, city, timezone) {
// create card and get data to show up
  const tempElement = document.getElementById('temp');
  const windElement = document.getElementById('wind');
  const humidityElement = document.getElementById('humidity');

  // Extracting the relevant data from the weatherData object
  const temperature = weatherData.main.temp;
  const windSpeed = weatherData.wind.speed;
  const humidity = weatherData.main.humidity;

  // Updating the HTML content with the current day's weather information
  tempElement.textContent = `Temperature in ${city}: ${temperature} °F`;
  windElement.textContent = `Wind Speed: ${windSpeed} m/s`;
  humidityElement.textContent = `Humidity: ${humidity}%`;
}

function renderForecast(forecast) {
  // create cards & get data to show up
}

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', handleSearch);

function getGeocodingData(city) {
    var apiGeoKey = '5b17d158e4ae1c29c8841402bf27bc4d'
   // var limit = 5;

    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiGeoKey}`;
  // hard code the limit, just hard code it for this project.

    fetch(geoUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // if (data.length > 0) {
          // const latitude = data[0].lat;
          // const longitude = data[0].lon;
          fetchWeather(data[0]);
          // instead of returning lat & lon call fetchWeather function that I will write, how do you call a function? fetchweather(lat,lon); 
        // } else {
        //  throw new Error('No coordinates found for the specified city.');
       // }
      });
  }

function fetchWeather(location) {
   // const searchInput = document.getElementById('searchInput');
    const city = location.name;
    console.log(city);
    const {lat,lon} = location;
    
    var apiMapKey = 'fb76df9a3f66718bed25c952ed121f1b'

    const mapUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiMapKey}&units=imperial`;
  
    fetch(mapUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      sharedData(data,city)
      })
      .catch(error => {
        console.error(error);
      });
  }

function sharedData(data,city) {
  const currentDayData = (data.list[0]);
  const forecastData = data.list.slice(1);

  currentDay(currentDayData, city, data.city.timezone);
  renderForecast(forecastData);
}

