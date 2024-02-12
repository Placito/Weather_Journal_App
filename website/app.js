// Personal API Key for OpenWeatherMap API
const apiKey = '<your_api_key>&units=imperial';

// Select the element with id 'generate'
const generateButton = document.getElementById('generate');

// Define the named callback function
function handleClick(event) {
    event.preventDefault()

    console.log('Button clicked!');
}

// Add an event listener to the 'generate' button
generateButton.addEventListener('click', handleClick);

// Function to GET Project Data
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();