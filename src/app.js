const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')

const publicDir = path.join(__dirname,'../public')
const viewsDir = path.join(__dirname,'../templates/views')
const partialsDir = path.join(__dirname,'../templates/partials')

const app = express()

app.use(express.static(publicDir))
app.set('views', viewsDir)
app.set('view engine', 'hbs')

hbs.registerPartials(partialsDir)

// HOME
app.get('', (req, res)=>{
	res.render('home', {
		title: 'Weather - Home',
		message: 'This is my home page'
	})
})


app.get('/weathery', (req, res) => {
    if (!req.query.address) {
        return res.render('error', {
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.render('error', { error })
        }

        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.render('error', { error })
            }
            res.render('home',{
				icon: forecastData.icon,
				temperature: forecastData.temperature,
				descriptions: forecastData.descriptions,
				humidity: forecastData.humidity,
				wind: forecastData.wind,
                location,
                url_address: req.query.address
            })
        })
    })
})


// ABOUT
app.get('/about', (req, res)=>{
	res.render('about', {
		title: 'About-me',
		message: 'About me page'
	})
})

app.get('/about/*', (req, res)=>{
	res.render('about', {
		title: 'About-me',
		message: 'LINK DOES NOT EXIST!'
	})
})

// HELP
app.get('/help', (req, res)=>{
	res.render('help', {
		title: 'Help',
		message: 'Help page'
	})
})

app.get('/help/*', (req, res)=>{
	res.render('error', {
		title: 'Help',
		error: 'HELP ARTICLE NOT FOUND!'
	})
})

// 404 PAGE
app.get('*', (req, res)=>{
	res.render('error', {
		title: 'Error 404',
		error: 'PAGE NOT FOUND!'
	})
})


app.listen(3000, ()=>{
	console.log('Server is up at port 3000')
})