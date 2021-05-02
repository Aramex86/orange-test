import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/book_logo.png';

const Header = () => {
  return (
    <header className="header_wrapp">
      <div className="header_wrapp-logo">
        <img src={logo} alt="logo" />
        <span>BooK App</span>
      </div>
      <div className='btn_wrapp'>
        <Link to="/" className="btn_wrapp-btn-link">
          search
        </Link>
        <Link to="/favorite" className="btn_wrapp-btn-link">
          faforite
        </Link>
      </div>
    </header>
  );
};

export default Header;
