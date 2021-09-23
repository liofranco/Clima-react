import React , { useRef, useState } from 'react';

const Form = ({busqueda, guardarBusqueda, guardarConsultar}) => {

    const {city} = busqueda
    const [error, guardarError] = useState(false)
    const inputSearch = useRef(null)

    const handleChange = e => {
            guardarBusqueda({
                ...busqueda,
                [e.target.name] : e.target.value
            })        
    }

    const handleSubmit = e => {
        e.preventDefault()
        if( city.trim() === ''){
            guardarError(true)
            return
        } else {
            guardarError(false)
            guardarConsultar(true)
            inputSearch.current.blur()
        }
    }



    return (
        <div className='container-form flex-center'>
            {error ? <p>Error</p> : null}
            <form onSubmit={handleSubmit} className='form'>
                <input 
                    type="text" name="city" id="city" placeholder="Buscar ciudad"
                    value={city} onChange={handleChange} className='input' ref={inputSearch}/>
                <input type="submit" value='Buscar' className='search' />
            </form>
        </div>
    );
};

export default Form;