import React from 'react';
import './Header.css';
import BrandIcon from '../../assets/brand.svg';
import HamburgerIcon from '../../assets/hamburger.svg';

const Header = ({ onToggleSidebar }) => {
    return (
        <div className="header">
            <img
                src={HamburgerIcon}
                alt="Menu"
                className="hamburger-icon"
                onClick={onToggleSidebar}
            />
            <img src={BrandIcon} alt="Brand" className="brand-icon" />
        </div>
    );
};

export default Header;
