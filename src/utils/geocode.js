const request = require('request')

const geoCode = (address, callback) => {
    const apiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoib2Vsc3VzZXIiLCJhIjoiY2szanlzNHY3MG9vMTNqcm0ycW1nNmN6eCJ9.oavImX4W49byhUQ1jkypOw&limit=1"'
    request({'url': apiUrl, json: true},(error, {body}) => {
        if (error) {
            callback('Unable to connect to location service', undefined)    
        } else if(body.features.length === 0) {
            callback('Unable to find location,Try another search', undefined)
        } else {
            callback(undefined, {
                'latitude' : body.features[0].center[1],
                'longitude': body.features[0].center[0],
                'location': body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode