import React from 'react';
import { Link } from 'react-router';
import { FaHome, FaUser } from 'react-icons/fa';

const Menu = () => (
    <nav className="menu">
        <Link to="/" activeClassName="selected">
            <div className="menu-item">
                <div className="menu-item-title">Namai</div>
                <FaHome />
            </div>
        </Link>
        <Link to="/login" activeClassName="selected">
            <div className="menu-item">
                <div className="menu-item-title">Prisijungti</div>
                <FaUser />
            </div>
        </Link>
    </nav>
);

export default Menu;