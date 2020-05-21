import React from 'react';
import './LoadingSpinner.css';
import PropTypes from 'prop-types';

function LoadingSpinner({ className="", colorClass="", loading=false }) {
    
    const spinner =(<div className={"loading-spinner "+className}>
                        <div className="preloader-wrapper big active">
                            <div className={"spinner-layer spinner-blue-only "+colorClass}>
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                                <div className="circle"></div>
                            </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                            </div>
                        </div>
                    </div>);

    return ( loading? spinner : null );
}

LoadingSpinner.propTypes = {
    className: PropTypes.string,
    colorClass: PropTypes.string,
    loading: PropTypes.bool
}

export default LoadingSpinner;