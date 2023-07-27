function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  const city = searchInput.value.trim();

  if (city === '') {
    alert('Please enter a city name.');
    return;
  }
  saveCityToLocalStorage(city);
  // Call the function to populate previous searches when the page loads
  populatePreviousSearches();
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

  const previousSearchesEl = document.getElementById('previousSearches');

  previousSearchesEl.innerHTML = '';

  previousCities.forEach(city => {
    const listItem = document.createElement('div');
    listItem.classList.add('search-history-item');
    listItem.textContent = city;
    previousSearchesEl.appendChild(listItem);

    // Event listener to each search history item
    listItem.addEventListener('click', () => handlePreviousSearch(city));
  });
}

function handlePreviousSearch(city) {
  getGeocodingData(city);
}

function currentDay(weatherData, city) {
  const todayDataEl = document.getElementById('todayData');

  // Extracting the relevant data from the weatherData object
  const temperature = weatherData.main.temp;
  const windSpeed = weatherData.wind.speed;
  const humidity = weatherData.main.humidity;
  const date = new Date();

  const iconCode = weatherData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

  // Creating and populating the elements for Today's forecast
  const dateEl = document.createElement('p');
  dateEl.textContent = `Date: ${date.toLocaleDateString('en-US')}`;

  // Creating and populating the elements for Today's forecast
  const temperatureEl = document.createElement('p');
  temperatureEl.textContent = `Temperature in ${city}: ${temperature}°F`;

  const windEl = document.createElement('p');
  windEl.textContent = `Wind Speed: ${windSpeed} m/s`;

  const humidityEl = document.createElement('p');
  humidityEl.textContent = `Humidity: ${humidity}%`;

  // Weather icon element
  const weatherIconEl = document.createElement('img');
  weatherIconEl.src = iconUrl;
  weatherIconEl.alt = 'Weather Icon';

  // Clear the previous content and add the new data to the container
  todayDataEl.innerHTML = '';
  todayDataEl.appendChild(dateEl);
  todayDataEl.appendChild(temperatureEl);
  todayDataEl.appendChild(windEl);
  todayDataEl.appendChild(humidityEl);
  todayDataEl.appendChild(weatherIconEl);
}

// Function to render the five-day forecast
function renderForecast(forecast) {
  // create cards to display data
  const forecastSection = document.getElementById('five-day');
  forecastSection.innerHTML = '';

  // Filtering out duplicate results for each date
  const uniqueDates = forecast.reduce((dates, dayData) => {
    const date = new Date(dayData.dt_txt).toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'});
    if (!dates.includes(date)) {
      dates.push(date);
    }
    return dates;
  }, []);

  for (const date of uniqueDates) {
    // Filtering forecast data for the current date
    const forecastForDate = forecast.filter(dayData => {
      const currentDate = new Date(dayData.dt_txt).toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'});
      return currentDate === date;
    });
  
    // Creating a forecast card element
    const cardEl = document.createElement('div');
    cardEl.classList.add('forecast-card');

    // Extracting the relevant data from dayData
    const temperature = forecastForDate[0].main.temp;
    const weatherDesc = forecastForDate[0].weather[0].description;
    const iconCode = forecastForDate[0].weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

    // Creating and populating the elements inside the card
    const dateEl = document.createElement('p');
    dateEl.textContent = date;
  
    const temperatureEl = document.createElement('p');
    temperatureEl.textContent = `Temperature: ${temperature} °F`;
    
    const weatherDescEl = document.createElement('p');
    weatherDescEl.textContent = `Weather: ${weatherDesc}`;

    const weatherIconEl = document.createElement('img');
    weatherIconEl.src = iconUrl;
    weatherIconEl.alt = weatherDesc;
  
    // Appending the elements to the card
    cardEl.appendChild(dateEl);
    cardEl.appendChild(temperatureEl);
    cardEl.appendChild(weatherDescEl);
    cardEl.appendChild(weatherIconEl);

    // Append the card to the forecast section
    forecastSection.appendChild(cardEl);  
    }
  }

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', handleSearch);

function getGeocodingData(city) {
    const apiGeoKey = '5b17d158e4ae1c29c8841402bf27bc4d'

    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiGeoKey}`;
  
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

  // Line 113 calls currentDay function detailed above in line 42
function sharedData(data,city) {
  const currentDayData = (data.list[0]);
  const forecastData = data.list.slice(1);

  currentDay(currentDayData, city, data.city.timezone);
  //renderForecast(data);
  renderForecast(forecastData);
}

