/* const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput');
    const city = searchInput.value;

    const apiKey = 'fb76df9a3f66718bed25c952ed121f1b';

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={fb76df9a3f66718bed25c952ed121f1b}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        })
        .catch(error => {
        console.error(error);
    });
}); */

function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const city = searchInput.value;
  
    const apiMapKey = 'fb76df9a3f66718bed25c952ed121f1b';
  
    const mapUrl = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${fb76df9a3f66718bed25c952ed121f1b}`;
  
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
  
  function getGeocodingData(city) {
    const apiGeoKey = '5b17d158e4ae1c29c8841402bf27bc4d';
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${5b17d158e4ae1c29c8841402bf27bc4d}`;
  
    return fetch(goeUrl)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const latitude = data[0].lat;
          const longitude = data[0].lon;
          return { latitude, longitude };
        } else {
          throw new Error('No coordinates found for the specified city.');
        }
      });
  }
