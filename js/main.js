/* global $ */

$(document).ready(function () {
  let currentTime = (new Date()).getTime() / 1000 // get current time to compare with sunrise/sunset
  $.getJSON('http://ip-api.com/json', function (data) {
    let city = data.city
    // $('#data').html('Latitude: ' + lat + '<br>Longitude: ' + long)
    let weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?q=' + city +
    '&appid=8c77ee9a6bfdf409302c99e062da2cad'
    $.getJSON(weatherAPI, function (data) {
      let weatherType = data.weather[0].description
      let kelvinTemp = data.main.temp
      let fahrenheitTemp = Math.round((kelvinTemp * (9 / 5) - 459.67), 2)  // temperature conversion from Kelvin to Fahrenheit
      let celsiusTemp = Math.round(kelvinTemp - 273)
      let city = data.name
      let country1 = data.sys.country
      let humidity = data.main.humidity
      let windSpeed = (data.wind.speed * 2.237).toFixed(1)
      let sunriseTime = data.sys.sunrise
      let sunsetTime = data.sys.sunset

      $('#city').html(city + ', ' + country1)
      $('#weatherType').html(weatherType)
      $('#fahrenheitTemp').html(fahrenheitTemp + '&#8457;')
      $('#humidity').html('Humidity: ' + humidity + '&#37;')
      $('#windSpeed').html('Wind speed: ' + windSpeed + ' mph')

    // Daytime backgrounds determined by weatherType
      if (currentTime > sunriseTime && currentTime < sunsetTime) {
        switch (weatherType) {
          case 'clouds':
            $('body').css({'background-image': 'url(http://cdn.wallpapersafari.com/62/36/g6QsB3.jpg)', 'color': 'black'})
            break
          case 'few clouds':
          case 'scattered clouds':
          case 'broken clouds':
          case 'overcast clouds':
            $('body').css({'background-image': 'url(http://cdn.wallpapersafari.com/44/23/juRDWs.jpg)', 'color': 'blue'})
            break
          case 'clear sky':
            $('body').css({'background-image': 'url(http://cdn.wallpapersafari.com/83/21/SJ8GKT.jpg)', 'color': 'magenta'})
            break
          case 'fog':
            $('body').css('background-image', 'url(http://cdn.wallpapersafari.com/98/51/CwSEFM.jpg)')
            break
          case 'clear':
            $('body').css('background-image', 'url(http://cdn.wallpapersafari.com/83/21/SJ8GKT.jpg)')
            break
          case 'thunderstorm':
            $('body').css('background-image', 'url(http://cdn.wallpapersafari.com/56/34/bUQcsI.jpg)')
            break
          case 'mist':
          case 'haze':
            $('body').css({'background-image': 'url(http://cdn.wallpapersafari.com/68/15/7hXinW.jpg)', 'color': 'white'})
            break
          case 'light rain':
            $('body').css('background-image', 'url(http://cdn.wallpapersafari.com/80/79/6JmCqO.jpg)')
            break
          case 'snow':
            $('body').css({'background-image': 'url(http://cdn.wallpapersafari.com/40/68/Ll1sMY.jpeg)', 'color': 'magenta'})
            break
          default: $('body').css('background-color', 'black')
        }
      } else // if nighttime
    // Nighttime backgrounds determined by weatherType

  {
        switch (weatherType) {
          case 'clouds':
            $('body').css({'background-image': 'url(http://cdn.wallpapersafari.com/49/19/KHf48W.jpg)',
              'color': 'black'})
            break
          case 'few clouds':
          case 'scattered clouds':
          case 'broken clouds':
          case 'overcast clouds':
            $('body').css('background-image', 'url(http://cdn.wallpapersafari.com/67/58/DBVKRL.jpg)')
            break
          case 'clear sky':
          case 'clear':
            $('body').css('background-image', 'url(http://cdn.wallpapersafari.com/8/67/2NI5bY.gif)')
            break
          case 'fog':
            $('body').css('background-image', 'url(http://cdn.wallpapersafari.com/12/44/SIdrh1.jpg)')
            break
          case 'thunderstorm':
            $('body').css('background-image', 'url(http://cdn.wallpapersafari.com/56/34/bUQcsI.jpg)')
            break
          case 'mist':
            $('body').css('background-image', 'url(http://cdn.wallpapersafari.com/33/25/yc1j3g.jpg)')
            break
          case 'light rain':
            $('body').css({'background-image': 'url(hhttp://cdn.wallpapersafari.com/64/76/MPletD.jpg',
              'color': 'white'})
            break
          case 'snow':
            $('body').css({'background-image': 'url(http://cdn.wallpapersafari.com/40/68/Ll1sMY.jpeg)',
              'color': 'magenta'})
            break
          default: $('body').css('background-color', 'black')
        }
      }

      let tempUnits = 'F'
      $('#fahrenheitTemp').on('click', function () {
        if (tempUnits === 'F') {
          $('#fahrenheitTemp').html(celsiusTemp + '&#8451')
          tempUnits = 'C'
        } else {
          $('#fahrenheitTemp').html(fahrenheitTemp + '&#8457;')
          tempUnits = 'F'
        }
      })
    })
  })
})
