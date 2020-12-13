import React, { Component } from 'react';
import Display from './Display';

type WeatherState = {
    location: string,
    weather: number
};

type AcceptedProps = {
};

class Weather extends React.Component<{}, WeatherState> {
    constructor(props: any) {
        super(props);

        this.state = {
            location: '',
            weather: 0
        }

    }

    getWeather() {
        navigator.geolocation.getCurrentPosition((pos) => {
            let {latitude, longitude} = pos.coords;

            let apiKey = 'f609efa2c1b2a597d858821d82296b28';
            let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
            //39.7737984 - -86.2683136
            //api.openweathermap.org/data/2.5/weather?lat=39.7737984&lon=-86.2683136&appid=f609efa2c1b2a597d858821d82296b28
            fetch(apiUrl)
              .then((response) => response.json())
              .then((data) => {
                  this.setState({
                      location: data.name,
                      weather: (data.main.temp - 273.15) * (9/5) + 32
                  })
              })
        }, (err) => {console.log(err)});
    }

    componentDidMount() {
        this.getWeather()
    }

    render() {
        return (
            <div>
                <Display location={this.state.location} weather={this.state.weather.toFixed(1)}/>
            </div>
        )
    }
}

export default Weather;