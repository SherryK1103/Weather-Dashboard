const searchButton = document.getElementById('searchButton');

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
});


