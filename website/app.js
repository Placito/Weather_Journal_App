// Personal API Key for OpenWeatherMap API
const apiKey = '1836112321afa35b658fee24a48c3cac';


// Select the element with id 'generate'
const generateButton = document.getElementById('generate');

// Define the named callback function
function handleClick(event) {
    event.preventDefault();

    console.log('Button clicked!');
}

// Add an event listener to the 'generate' button
generateButton.addEventListener('click', handleClick);

// Function to GET Project Data
const retrieveData = async () => {
    // Get the values of the zip code input
    const zipCode = document.getElementById('zip').value;

    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;

    const request = await fetch(url);
    try {
        // Transform response to JSON
        const responseData = await request.json();

        // Extract relevant data
        const temperature = responseData.main.temp;
        const description = responseData.weather[0].description;

        // Update DOM elements
        document.getElementById('temp').innerHTML = `${temperature}°C`;
        document.getElementById('content').innerHTML = description;
        document.getElementById('date').innerHTML = new Date().toLocaleDateString();
    } catch (error) {
        console.log("error", error);
        // Handle error
    }
};

// Call retrieveData function when the page loads
window.addEventListener('load', retrieveData);