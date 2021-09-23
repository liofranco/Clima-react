import React from 'react';

const Header = ({titulo}) => {
    return (
        <div className='header flex-center'>
            <h1>{titulo}</h1>
        </div>
    );
};

export default Header;