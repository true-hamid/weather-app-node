const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = env.process.PORT || 3000;

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views');
const partialsDirPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsDirPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    developer: 'Hamid Abdalrahman'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    developer: 'Hamid Abdalrahman',
    jobTitle: 'Fullstack developer',
    summary: 'I software engineer, coder, tach enthusiast. Follow me on Github @true-hamid rn :)'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'is something that we always need and want, no matter how strong we might think or want people to think we are.',
    developer: 'Hamid Abdalrahman'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'FAC-011-001',
      message: 'Address parameter is missing, please provide it then try again.'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error: 'ERR-123-001',
        message: error
      })
    }

    forecast(latitude, longitude, (error, response) => {
      if (error) {
        return res.send({
          error: 'ERR-123-002',
          message: error
        });
      }

      return res.send({
        forecast: response.weather,
        location: response.location,
        address: req.query.address
      })
    })
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    developer: 'Hamid Abdalrahman',
    errorMessage: 'Help article not found!',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    developer: 'Hamid Abdalrahman',
    errorMessage: 'Page not found! ',
  });
});

app.listen(port, () => {
  console.log('Server is up on port 3000.')
});