import React from 'react';
import './LocationForm.css';
import { createAlert } from '../../alerts-helper';
import Input from '../input/Input';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import $ from 'jquery';

function LocationForm({ title = "Enter a Location", countries, loading, setLocation }) {
    var tempLocation = { city: null, countryCode: null };

    const initForm = async () => {
        tempLocation = { city: null, countryCode: null };
        $('#locationForm').trigger("reset");
    }

    const updateLocation = (event) => {
        event.preventDefault();

        if (!tempLocation.city || !tempLocation.countryCode) return createAlert({ type: 'Error', message: 'Please enter a location.' });
        let aux = countries.find(country => country.code === tempLocation.countryCode);
        if (!aux || !aux.name) return createAlert({ type: 'Error', message: 'The country is invalid.' });
        tempLocation.country = aux.name;
        setLocation(tempLocation);
        initForm();
    };

    const setCityInput = value => { tempLocation.city = value; };
    const valCityInput = value => {
        if (value.length === 0) return false;
        if (value.trim().length === 0) return true;
        return false;
    }

    const setCountryInput = value => { tempLocation.countryCode = value; };

    return (
        <div className="col s12 m5 center-align animated fadeIn location-form hoverable">
            <h2>{title}</h2>
            <form className="left-align" id="locationForm" onSubmit={(e) => updateLocation(e)}>
                <div className="input-field col s12">
                    <Input type="text" id="input-city" name="city" autoComplete="off" label="City"
                        setValue={setCityInput} valValue={valCityInput} />
                </div>
                <div className="input-field col s12">
                    <Input type="select" id="input-country" name="country" autoComplete="off" label="Country"
                        options={countries} setValue={setCountryInput} />
                </div>
                <div className="center-align">
                    <button className="btn btn-large location-submit" type="submit" name="action" id="locationSubmit">
                        Get Weather <FontAwesomeIcon icon="paper-plane" />
                    </button>
                </div>
            </form>
            <LoadingSpinner loading={loading} />
        </div>
    );
}

LocationForm.propTypes = {
    title: PropTypes.string,
    countries: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    setLocation: PropTypes.func.isRequired
}

export default LocationForm;