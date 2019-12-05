const request = require('request')

const weather = (latitude, longitude, callback) => {
    const apiUrl = 'https://api.darksky.net/forecast/4e828417f5fffbf92525f017ea556a12/'+latitude+','+longitude
    request({'url': apiUrl, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect with weather service', undefined)
        } else if(response.body.error) {
            callback('Unable to find your weather location', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = weather