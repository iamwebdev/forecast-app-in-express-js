const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode')
const forecast = require('./utils/weather')
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('/', (req,res) => {
    res.render('index')
})

app.get('/weather', (req,res) => {
    const query = req.query.city
    if (query) {
        geoCode(query, (error, {latitude, longitude, location} = {}) => {
            forecast(latitude, longitude, (err, response) => {
                if(!err) {
                    res.send({
                        'forecast': response,
                        location,
                        'address': query    
                    })
                } else {
                    res.send({error:'Cannot find any data with your search,Please try again with another search'})
                }
            })
        })
    } else {
        return res.send({error:'Please provide city'})
    }
})

app.listen(3000, () => {
    console.log('Server running on 3000')
})