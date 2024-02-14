// Global Variables
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '1836112321afa35b658fee24a48c3cac';

// Create a new date instance dynamically with JS
const currentDate = new Date().toLocaleDateString('en-US');

// Event listener to add function to existing HTML DOM element
const generateBtn = document.getElementById('generate');
generateBtn.addEventListener('click', performAction);

// Function called by event listener
async function performAction(e) {
    e.preventDefault();

    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    try {
        const data = await getWeatherData(baseUrl, zipCode, apiKey);
        await postData('/add', {
            temp: convertKelvinToCelsius(data.main.temp),
            date: currentDate,
            content: content
        });
        await updateUI();
    } catch (error) {
        console.error(error);
        alert('An error occurred. Please try again.');
    }
}

// Function to GET Web API Data
const getWeatherData = async(baseUrl, zipCode, apiKey) => {
    const res = await fetch(`${baseUrl}?q=${zipCode}&appid=${apiKey}`);
    if (!res.ok) {
        throw new Error('Failed to fetch weather data');
    }
    return await res.json();
};

// Function to POST data
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error('Failed to post data');
    }
    return await response.json();
};

// Function to update data in the UI
const updateUI = async () => {
    try {
        const response = await fetch('/all');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const { date, temp, content } = await response.json();
        if (date && temp !== undefined && content) {
            document.getElementById('date').innerHTML = `Date: ${date}`;
            document.getElementById('temp').innerHTML = `Temperature: ${temp} °C`;
            document.getElementById('content').innerHTML = `Your feelings: ${content}`;
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while updating the UI.');
    }
};

// Helper function to convert temperature from Kelvin to Celsius
function convertKelvinToCelsius(kelvin) {
    const celsius = kelvin - 273.15;
    return celsius < -273.15 ? 'below absolute zero (0 K)' : celsius.toFixed(2);
}
