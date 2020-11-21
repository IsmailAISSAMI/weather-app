const request = require('request')

const forecast = (lat, long, callback) => {
	const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(lat) + '&lon=' + encodeURIComponent(long) + '&appid=47013fdd01ed461e6deea9ec75be2d45&units=metric'

	request({ url, json: true}, (error, {body} = {}) => { // destructure response
		if (error) {
			callback('Unable to connect to the Weather Service!', undefined)
		} else {
			callback(undefined, {
				icon: body.weather[0].icon,
				temperature: body.main.temp,
				descriptions: body.weather[0].description,
				humidity: body.main.humidity,
				wind: body.wind.speed,
			})
		}
	})

}

module.exports = forecast

