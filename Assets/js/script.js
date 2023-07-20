// 1. First function should be handleSearch
// 2. geocoding function
// 3. fetch weather  function, change what I have in handlesearch now to fetchweather. Line 15 - i am grabbing the first one. 

function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  const city = searchInput.value.trim();

  if (city === '') {
    alert('Please enter a city name.');
    return;
  }

  getGeocodingData(city)
  
}


const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', handleSearch);

function getGeocodingData(city) {
    var apiGeoKey = '5b17d158e4ae1c29c8841402bf27bc4d'
    var limit = 5;

    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiGeoKey}`;
  // hard code the limit, just hard code it for this project.

    return fetch(geoUrl)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const latitude = data[0].lat;
          const longitude = data[0].lon;
          fetchWeather(latitude,longitude);
          // instead of returning lat & lon call fetchWeather function that I will write, how do you call a function? fetchweather(lat,lon); 
        } else {
          throw new Error('No coordinates found for the specified city.');
        }
      });
  }

function fetchWeather(lat, lon) {
    const searchInput = document.getElementById('searchInput');
    const city = searchInput.value;
    
    var apiMapKey = 'fb76df9a3f66718bed25c952ed121f1b'

    const mapUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiMapKey}`;
  
    fetch(mapUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }