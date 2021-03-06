import React, { Component } from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Skycons from 'react-skycons';
import socketIOClient from "socket.io-client";

import { MirrorWeatherIcon, MirrorWeather, MirrorWeatherContainer, MirrorWeathersContainer } from './../../../components/Mirror';

import * as actions from './../action';

const socket = socketIOClient();

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: false,
    };


    let interval;

    if(interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => {

      this.getLocation();

      socket.emit('getMirror', {weather: this.props.mirror.weather});

    }, 1000 * 60 * 60); // update every hr


    socket.on('updateWeather', (data) => {
      console.log('socketData: '+ JSON.stringify(data.weather));
    });

    socket.on('userUpdate', (data) => {
      console.log('user updated: '+ JSON.stringify(data.data));
    })

  }

  componentDidMount() {
    this.getLocation();
    socket.emit('getMirror', {weather: this.props.mirror.weather});
  }

  getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {


        console.log("latitudestate", position.coords.latitude);
        console.log("longitudestate", position.coords.longitude);
        this.props.getWeather(position.coords.latitude, position.coords.longitude);

      }.bind(this));

      } else {
        console.log("failed to geolocate");
      }

  }

  formatTime(time) {
    let date = new Date(time * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;
  }


  render() {
    if(!this.props.mirror.weather.currently){
      return(
        <p> loading.. </p>
      );
    } else {
      const WeatherArray = [ this.props.mirror.weather.hourly.data[0], this.props.mirror.weather.hourly.data[6], this.props.mirror.weather.hourly.data[13] ]

      const HourlyWeather = WeatherArray.map((t, i) => {

        const replace = /-/g;
        const time = this.formatTime(t.time);
        console.log(time);

        return (
          <MirrorWeatherContainer>
            <MirrorWeatherIcon>
              <Skycons
               color='white'
               icon={t.icon.replace(replace, "_").toUpperCase()}
               autoplay={true}
               style={{ width: '100%', height: '100%'}}
               />
            </MirrorWeatherIcon>

              <MirrorWeather>
                {t.temperature} °F
              </MirrorWeather>

              <MirrorWeather>
                {t.summary == "Partly Cloudy" || t.summary == "Mostly Cloudy" ? "Cloudy" : t.summary }
              </MirrorWeather>

          </MirrorWeatherContainer>

        )
      })

      return (
        <MirrorWeathersContainer>

        {HourlyWeather}

        </MirrorWeathersContainer>

      );
    }
  }
};

const mapStateToProps = ({ mirror, auth }) => {
  return {
    mirror,
    auth
  }
};

export default connect(mapStateToProps, { ...actions })(Weather);
