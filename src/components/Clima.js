import React from 'react';
import moment from 'moment';
import 'moment/locale/es'


const Clima = ({resultado, resultado2}) => {

    const {name, main, timezone, weather, cod, sys, wind} = resultado;

    let mesCity;
    let temperatura;
    let weatherIcon;
    let weatherDescription;

    let pronosticoSemana = resultado2.daily

    if(!pronosticoSemana){ 
        return null
    }

    moment.locale('es');
    if(cod === 200) {
        weatherDescription = weather[0].description
        /* weatherIcon = 'icons/' + weather[0].icon + '.png'; */
        weatherIcon = `icons/${weather[0].icon}.png`
        let diferenciaHoras = (timezone/3600)
        let hora = moment.utc()
        let fechaCity = hora.add(diferenciaHoras, 'hours')
        mesCity = fechaCity.format('dddd lll')
        temperatura = (main.temp - 273).toFixed(1)  
    } else return null

    

    return (
        <div className='city-container'>
            <div className='container-weather'>
                <div className="weather flex-center">
                    <div className="location-container">
                        <img src='icons/location.png' alt=''/>
                        <p className='nombre'><span>{name}</span>, {sys.country}</p>
                    </div>
                    <p className='fecha'>{mesCity}</p>
                    <div className='flex-center temp-container'>
                        <div className='icon-container'>
                            <img src={weatherIcon} alt='' className='weather-icon' />
                            <p>{weatherDescription}</p>
                        </div>
                        <p className='temp'>{temperatura}°</p>
                    </div>
                </div>
                <div className='weather-details'>
                    <div className='details-cards'>
                        <img src='icons/humidity.png' alt='' className='details-icon' />
                        <p className='details-data'>{main.humidity}%</p>
                        <p className='details-text'>Humedad</p>
                    </div>
                    <div className='details-cards'>
                        <img src='icons/pressure.png' alt='' className='details-icon' />
                        <p className='details-data'>{main.pressure} hPa</p>
                        <p className='details-text'>Presión</p>
                    </div>
                    <div className='details-cards'>
                        <img src='icons/wind.png' alt='' className='details-icon' />
                        <p className='details-data'>{wind.speed} km/h</p>
                        <p className='details-text'>Viento</p>
                    </div>
                
                </div>
            </div>
            
            <div className='week-container'>
            <h2 className='week-title'>Proximos 7 días</h2>
                {pronosticoSemana.map( dia => {

                    let fecha = moment.unix(dia.dt)
                    let tempMax = dia.temp.max.toFixed(0)
                    let tempMin = dia.temp.min.toFixed(0)
                    /* let icon = 'icons/' + dia.weather[0].icon + '.png' */
                    let icon = `icons/${dia.weather[0].icon}.png`

                    return (
                    <div key={dia.dt} className='days-container'>
                        <div className='week-days'>
                            <p>{fecha.format('dddd')}</p>
                        </div>
                        <img src={icon} alt='' className='days-icon' />
                        <p className='temp-week'><span>{tempMax}°</span>/{tempMin}°</p>
                    </div>
                )


                })}
            </div>
        </div>
    );
};

export default Clima;