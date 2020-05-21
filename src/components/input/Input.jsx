import React, { Fragment } from 'react';
import './Input.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuid } from 'uuid';
import $ from 'jquery';

function Input({ label = null, prefix = null, type = "text", id, name = "", placeholder = "", options=[],
    errorMsg = "Please check the info introduce.", autoComplete = "on", setValue, valValue = ((aux) => false) }) {

    var inputMsgId = id + "-error";

    const initInput = id => {
        removeInputClass(id, "invalid");
    }

    const addInputClass = (id, className) => {
        $("label[for='"+id+"']").addClass(className);
        $("#" + id).addClass(className);
    }
    const removeInputClass = (id, className) => {
        $("label[for='"+id+"']").removeClass(className);
        $("#" + id).removeClass(className);
    }

    const changeValue = e => {
        let temp = e.target.value;

        if (valValue(temp)) {
            $("#" + inputMsgId).fadeIn();
            return addInputClass(id, "invalid");
        }
        $("#" + inputMsgId).fadeOut();
        removeInputClass(id, "invalid");
        setValue(temp);
    }

    return (
        <Fragment>
            { prefix ? <FontAwesomeIcon className="prefix" icon={prefix} /> : null }
            { type==="select" && options?
                <select defaultValue="" className="validate" type={type} id={id} name={name}
                    onChange={changeValue} onReset={initInput(id)} autoComplete={autoComplete}>
                    <option value="" disabled>Choose an option</option>
                    { options.map(country => (
                        <option key={uuid()} value={country.code}>{country.name}</option>
                    )) }
                </select>
            :
                placeholder !== ""?
                    <input className="validate" type={type} id={id} name={name} placeholder={placeholder}
                        onChange={changeValue} onReset={initInput(id)} autoComplete={autoComplete} />
                :
                    <input className="validate" type={type} id={id} name={name}
                        onChange={changeValue} onReset={initInput(id)} autoComplete={autoComplete} />
            }
            {label ? <label htmlFor={id}>{label}</label> : null}
            <small className="input-error-msg" id={inputMsgId}>{errorMsg}</small>
        </Fragment>
    );
}

Input.propTypes = {
    label: PropTypes.string,
    prefix: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    errorMsg: PropTypes.string,
    autoComplete: PropTypes.string,
    setValue: PropTypes.func.isRequired,
    valValue: PropTypes.func,
}

export default Input;