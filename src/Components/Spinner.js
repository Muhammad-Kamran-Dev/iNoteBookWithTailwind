import React from 'react';
import PropTypes from 'prop-types'

export default function Spinner({ height, margin }) {
    return (
        <div className={`flex items-center justify-center ${margin} ${height} `} >
            <img className='h-52   ' src="/images/Spinner.gif" alt="Loading" />
        </div>
    );
}

Spinner.propTypes = {
    height: PropTypes.string,
    margin: PropTypes.string,

};
Spinner.defaultProps = {
    height: "h-52",
    margin: "mt-52",
};