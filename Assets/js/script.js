// 1. function should be handleSearch
// 2. geocoding function
// 3. fetch weather  function, change what I have in handlesearch now to fetchweather.


function getGeocodingData(city) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q={city name},${state code},${country code}&limit=${limit}&appid={5b17d158e4ae1c29c8841402bf27bc4d}`;
  // hard code the limit, just hard code it for this project. openweather has country code info. 
    return fetch(geoUrl)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const latitude = data[0].lat;
          const longitude = data[0].lon;
          return { latitude, longitude }; // instead of returning lat & lon call fetchWeather function that I will write, how do you call a function? fetchweather(lat,lon); 
        } else {
          throw new Error('No coordinates found for the specified city.');
        }
      });
  }




function handleSearch(lat, lon) {
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
  
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', handleSearch);
  
 
