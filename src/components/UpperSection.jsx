import React from 'react'

import logo from '../images/logo.png'

function UpperSection() {
    return (

        <div className='upperSection'>
            <img src={logo} alt="9M1XLOwYWt" height={40} style={{ margin: '5px' }} />
            <p style={{ fontSize: '30px', margin: '0', color: 'white' }}>Chatties</p>
        </div>
    )
}

export default UpperSection