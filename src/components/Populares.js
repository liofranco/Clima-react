import React from 'react';

const Populares = () => {
    return (
        <div className="populares-container flex-center" >
            <h3 className="populares-tittle">Ciudades</h3>
            <div className="cards-container">
                <div className="populares-cards paris">
                    <h3 className='cards-city'>Paris, FR</h3>
                </div>
                <div className="populares-cards sidney">
                    <h3 className='cards-city'>Sidney, AU</h3>
                </div>
                <div className="populares-cards roma">
                <h3 className='cards-city'>Roma, IT</h3>
                </div>
                <div className="populares-cards new-york">
                <h3 className='cards-city'>New York, US</h3>
                </div>
            </div>
        </div>
    );
};

export default Populares;