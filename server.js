const express = require('express')
const cors = require('cors')
const app = express()
 
app.use(cors())
 
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 
app.listen(3000, function () {
  console.log('CORS-enabled web server listening on port 80')
})

//Javascript object
projectData = {}