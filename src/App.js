import React, {useState, useEffect} from 'react'
import './App.css';
/* import Header from './components/Header' */
import Form from './components/Form'
import Clima from './components/Clima'
import Error from './components/Error'

function App() {

  const [consultar, guardarConsultar] = useState(false)
  const [consultarHome, guardarHome] = useState(true)

  const [busqueda, guardarBusqueda] = useState({
    city: '',
  })

  const {city} = busqueda

  const [resultado, guardarResultado] = useState({})
  const [resultado2, guardarResultado2] = useState({})

  const [errorBusqueda, guardarErrorBusqueda] = useState(false)

  useEffect( () => {

    if(consultarHome){
      const consultarApiHome = async () => {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=buenos aires&appid=abb62160bb8bd7cb5ccd30a63f1d7398&lang=es`
        const respuesta = await fetch(url)
        const resultadoApi = await respuesta.json()

        guardarResultado(resultadoApi)
          
        if(resultadoApi.cod === '404'){
          guardarErrorBusqueda(true)
        } else {
          guardarErrorBusqueda(false)

          const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=-34.61&lon=-58.37&appid=abb62160bb8bd7cb5ccd30a63f1d7398&units=metric&lang=es`
          const respuesta2 = await fetch(url2)
          const resultadoApi2 = await respuesta2.json()

          guardarResultado2(resultadoApi2)
        }

        guardarHome(false)

      }
      consultarApiHome()  
    }

  }, [consultarHome])

  useEffect( () => {

    if(consultar){
      const consultarApi = async () => {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=abb62160bb8bd7cb5ccd30a63f1d7398&lang=es`
        const respuesta = await fetch(url)
        const resultadoApi = await respuesta.json()      
  
        guardarResultado(resultadoApi)
        guardarConsultar(false)

        if(resultadoApi.cod === '404'){
          guardarErrorBusqueda(true)
          return
        } else {
          guardarErrorBusqueda(false)
          const consultarOneCall = async () => {
            const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${resultadoApi.coord.lat.toFixed(2)}&lon=${resultadoApi.coord.lon.toFixed(2)}&appid=abb62160bb8bd7cb5ccd30a63f1d7398&units=metric&lang=es`
            const respuesta2 = await fetch(url2)
            const resultadoApi2 = await respuesta2.json()    
            guardarResultado2(resultadoApi2)
          }
          consultarOneCall()
        }
     
      }
      consultarApi()     
      
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultar])


  return (
    <>
    <Form
      busqueda={busqueda}
      guardarBusqueda={guardarBusqueda}
      guardarConsultar={guardarConsultar}
      guardarErrorBusqueda={guardarErrorBusqueda}
    />
    { errorBusqueda ? <Error /> : <Clima
                            resultado={resultado}
                            resultado2={resultado2}
                          /> }
    
    </>

  );
}

export default App;
