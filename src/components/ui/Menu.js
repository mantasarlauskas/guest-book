import React from 'react';
import { Link } from 'react-router';
import { FaHome } from 'react-icons/fa';

export default () => (
    <nav className="menu">
        <Link to="/">
            <div className="menu-item">
                <div className="menu-item-title">Namai</div>
                <FaHome />
            </div>
        </Link>
    </nav>
);