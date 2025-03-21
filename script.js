// Set up your OpenWeatherMap API Key
const apiKey = 'c11e0930b9e7bf14400b5e2d1ae634b3';

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Clear previous error message and hide it
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = '';
  errorMessage.classList.remove('active');

  try {
    const response = await fetch(apiURL);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`City not found. Please try again.`);
    }

    const data = await response.json();

    // Update UI elements with weather data
    document.querySelector('.city').textContent = data.name;
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('description').textContent = data.weather[0].description;

    // Clear existing icon and set the new one
    const iconCode = data.weather[0].icon;
    document.getElementById('icon').innerHTML = ''; // Clear previous icon
    document.getElementById('icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="weather icon">`;

    // Show weather-info section by restarting its fade-in animation
    const weatherInfo = document.querySelector('.weather-info');
    weatherInfo.style.opacity = "0";  // Reset opacity to re-trigger the fade-in effect
    setTimeout(() => weatherInfo.style.opacity = "1", 100);

  } catch (error) {
    console.error(error.message);
    errorMessage.textContent = error.message;
    errorMessage.classList.add('active'); // Activate slide-in animation
  }
}
