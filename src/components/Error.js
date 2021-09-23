import React from 'react';

const Error = () => {
    return (
        <div className="city-container sin-resultados">
            <div className="container-weather error-container">
                <img src='icons/error.png' alt='' />
                <h3>No hay resultados</h3>
            </div>
        </div>
    );
};

export default Error;