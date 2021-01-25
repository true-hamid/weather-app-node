const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=bf3ec24a76c3538ccdb45c59026e0c8e&query=${longitude},${latitude}&units=f`

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, { location: response.body.location,weather: response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out." })
        }
    })
}

module.exports = forecast