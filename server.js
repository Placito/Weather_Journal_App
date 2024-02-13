//Javascript object
projectData = {};

const express = require('express')
const cors = require('cors')
const app = express()
 
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 
app.listen(3000, function () {
  console.log('CORS-enabled web server listening on port 3000')
})

