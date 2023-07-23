function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  const city = searchInput.value.trim();

  if (city === '') {
    alert('Please enter a city name.');
    return;
  }
  saveCityToLocalStorage(city);
  getGeocodingData(city);
}

function saveCityToLocalStorage(city) {
  let previousCities = localStorage.getItem('previousCities') || '[]';
  previousCities = JSON.parse(previousCities);
  // Add the new city to the list of previous cities
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

  previousSearchesElement.innerHTML = '';

  previousCities.forEach(city => {
    const listItem = document.createElement('li');
    listItem.textContent = city;
    previousSearchesElement.appendChild(listItem);
  });
}

// Call the function to populate previous searches when the page loads
populatePreviousSearches();

function currentDay(weatherData, city) {
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
    const apiGeoKey = '5b17d158e4ae1c29c8841402bf27bc4d'

    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiGeoKey}`;
  
    fetch(geoUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        fetchWeather(data[0]);
      });
  }

function fetchWeather(location) {
   // const searchInput = document.getElementById('searchInput');
    const city = location.name;
    console.log(city);
    const {lat,lon} = location;
    
    const apiMapKey = 'fb76df9a3f66718bed25c952ed121f1b'

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
  //const forecastData = data.list.slice(1);

  currentDay(currentDayData, city, data.city.timezone);
  //renderForecast(forecastData);
}

