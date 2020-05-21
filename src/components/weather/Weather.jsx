import React from 'react';
import './Weather.css';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

function Weather({ title = "The Weather is", loading, weather, setLoading, requestAPI }) {

    const kelvin = 273.15;

    const updateWeather = () => {
        setLoading(true);
        requestAPI();
    };

    return (
        <div className="col s12 m6 offset-m1 center-align animated fadeIn weather-section hoverable">
            <h2>{title}</h2>
            <table className="highlight centered responsive-table">
                <tbody>
                    <tr style={{borderTop: "1px solid rgba(0,0,0,0.12)"}}>
                        <td><p className="temperature important">
                                Temperature: {Math.round((weather.temp - kelvin) * 100) / 100}<span>&#x2103;</span>
                        </p></td>
                        <td><p className="temperature important">
                                Feels Like: {Math.round((weather.feels_like - kelvin) * 100) / 100}<span>&#x2103;</span>
                        </p></td>
                    </tr>
                    <tr>
                        <td><p className="temperature">
                                Maximum Temperature: {Math.round((weather.temp_max - kelvin) * 100) / 100}<span>&#x2103;</span>
                        </p></td>
                        <td><p className="temperature">
                                Minimum Temperature: {Math.round((weather.temp_min - kelvin) * 100) / 100}<span>&#x2103;</span>
                        </p></td>
                    </tr>
                    <tr>
                        <td><p className="temperature">
                                Humidity: {weather.humidity}<span>%</span>
                        </p></td>
                        <td><p className="temperature">
                                Pressure: {weather.pressure}<span>hPa</span>
                        </p></td>
                    </tr>
                    <tr>
                        <td><p className="temperature important">
                                Sunrise: {weather.sunrise.toLocaleTimeString()} AM
                        </p></td>
                        <td><p className="temperature important">
                                Sunset: {weather.sunset.toLocaleTimeString()} PM
                        </p></td>
                    </tr>
                </tbody>
            </table>
            <button className="btn btn-small reload-weather" id="reloadWeather" onClick={() => updateWeather()} >
                <FontAwesomeIcon icon="redo-alt" />
            </button>
            <LoadingSpinner loading={loading} />
        </div>
    );
}

Weather.propTypes = {
    title: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    weather: PropTypes.object.isRequired,
    setLoading: PropTypes.func.isRequired,
    requestAPI: PropTypes.func.isRequired
}

export default Weather;