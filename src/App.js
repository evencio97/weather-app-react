import React, { Fragment, useState, useEffect } from 'react';
import 'mdbreact/dist/css/mdb.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
//Components
import Header from './components/header/Header';
// import Footer from './components/footer/Footer';
import LocationForm from './components/locationForm/LocationForm';
import Weather from './components/weather/Weather';
import { createAlert } from './alerts-helper';
import M from 'materialize-css';

//FontAwesome library
library.add(fab, faPaperPlane, faRedoAlt);

function App() {
    // Countries State
    const [countries, setCountries] = useState([
        { name: "Alemania", code: "DE" },
        { name: "Argentina", code: "US" },
        { name: "Colombia", code: "CO" },
        { name: "Costa Rica", code: "CR" },
        { name: "Estados Unidos", code: "US" },
        { name: "España", code: "ES" },
        { name: "México", code: "MX" },
        { name: "Perú", code: "PE" },
        { name: "Venezuela", code: "VE" }
    ]);
    // Location State
    const [location, setLocation] = useState({ city: null, country: null, countryCode: null });
    // Request State
    const [loading, setLoading] = useState(false);
    // Weather State
    const [weather, setWeather] = useState(null);

    useEffect( () => {
        if (!location.city) return;
        setLoading(true);
        requestAPI();
    }, [location]);

    const requestAPI = async () => {
        let url = "http://api.openweathermap.org/data/2.5/weather?q="+location.city+","+location.countryCode+"&appid=be4e7ab3a90a8636f1617decf1d658c7";
        let response = await fetch(url);
        let result = await response.json();
        // Hide Spinner
        setLoading(false);
        // Reset selects
        var elements = document.querySelectorAll('select');
        M.FormSelect.init(elements);
        // Validate response
        if (result.cod !== 200 && result.message) return createAlert({ type: 'Error', message: result.message });
        if (!result.main || !result.sys) return createAlert({ type: 'Error', message: 'Please try again later.' });
        // Set Weather
        setWeather({
            feels_like: result.main.feels_like,
            humidity: result.main.humidity,
            pressure: result.main.pressure,
            temp: result.main.temp,
            temp_max: result.main.temp_max,
            temp_min: result.main.temp_min,
            sunrise: new Date(result.sys.sunrise),            
            sunset: new Date(result.sys.sunset),            
        });
    }

    return (
        <Fragment>
            <Header img="/meteorology.png" title="Wheater App" link="https://evenciohernandez.com.ve" />
            <div className="container main-content" id="content">
                <div className="row">
                    <LocationForm countries={countries} loading={loading} setLocation={setLocation} />
                    { weather ?
                        <Weather title={"The Weather in "+location.city+" is:"} weather={weather} 
                        loading={loading} setLoading={setLoading} requestAPI={requestAPI} />
                    :
                        null
                    }
                </div>
            </div>
            {/* <Footer /> */}
        </Fragment>
    );
}

export default App;