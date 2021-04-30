import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header className='header_wrapp'>
            <Link to='/' className='btn-link'>search</Link>
            <Link to='/favorite' className='btn-link'>faforite</Link>
        </header>
    )
}

export default Header
