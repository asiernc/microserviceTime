// index.js

// init project
var express = require('express');
var app = express();
// where your node app starts

app.get('/api/:date?', (req, res) => {
  const capturedDate = req.params.date
  const test = /[0-9]{6,}/

  if(typeof capturedDate === 'undefined' || capturedDate === '') {
    // si parametro de fecha esta vacio debe devolver unix y utc actuales
    const fechaActual = new Date()
    const unixActual = fechaActual.getTime()
    const fechaFormateadaActual = fechaActual.toUTCString()

    res.json({unix: unixActual, utc: fechaFormateadaActual})
  } else if (test.test(capturedDate)) {
    const fechaUnix = req.params.date
    const unixTimestamp = Number(fechaUnix)
    const fecha = new Date(unixTimestamp)
    console.log(fecha)
    const fechaFormateada = fecha.toUTCString()
      
    res.json({unix: unixTimestamp, utc: fechaFormateada})
    
  } else {
    const fecha = new Date(capturedDate);
    if (!isNaN(fecha.getTime())) {
      const unix = fecha.getTime();
      const fechaFormateada = fecha.toUTCString();

      res.json({ unix: unix, utc: fechaFormateada });
    } else {
      res.json({ error: "Fecha no válida" });
    }
  }
})

/* app.get('/api/:date?', (req, res) => {
  const capturedDate = req.params.date
  const test = /[0-9]{6,}/
  
  const fecha = new Date(capturedDate)
  if(!isNaN(fecha.getTime())) {
    const unix = fecha.getTime();
    const fechaFormateada = fecha.toUTCString()

    res.json({unix:unix, utc: fechaFormateada})
    
  } else if (!isNaN(unixTimestamp)) {
    const fechaUnix = req.params.unix
    const unixTimestamp = Number(fechaUnix)
    res.json({error: "Invalid Date"})

  }
})
app.get('/api/:unix?', (req, res) => {
  const fechaUnix = req.params.unix
  const unixTimestamp = Number(fechaUnix)
  console.log(fechaUnix)
  if(!isNaN(unixTimestamp)){
    const fecha = new Date(fechaUnix)
    fecha = fecha.toUTCString()
      
    res.json({unix: fechaUnix, utc: fecha})
  } else {
    res.json({error: 'Invalid Unix'})
  }
}) */

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
