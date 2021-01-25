const request = require('postman-request');

const geocode = (address, callback) => {
    const mapBoxToken = 'pk.eyJ1IjoidHJ1ZS1oYW1pZCIsImEiOiJja2p5Mnc1MWcwM3h1MnZtZXVybmh2cGdkIn0.Tr-VZT2MfeKQTvWNd8xAgw';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapBoxToken}&limit=1`

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode