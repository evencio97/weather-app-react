import React from 'react';
import './Footer.css';
import PropTypes from 'prop-types';

const Footer = ({year= new Date().getFullYear()}) => ( 
        <footer id="footer">
            <p>Todos los derechos reservados &copy;{year}</p>
        </footer>
    );

Footer.propTypes = {
    year: PropTypes.string
}

export default Footer;
