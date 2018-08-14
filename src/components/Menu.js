import React from 'react';
import { Link } from 'react-router';
import { FaHome, FaUser } from 'react-icons/fa';

const Menu = (props) => (
    <nav className="menu">
        <Link to="/" activeClassName="selected">
            <div className="menu-item">
                <div className="menu-item-title">Namai</div>
                <FaHome />
            </div>
        </Link>
        {
            !props.user ? (
                <Link to="/login" activeClassName="selected">
                    <div className="menu-item">
                        <div className="menu-item-title">Prisijungti</div>
                        <FaUser />
                    </div>
                </Link> ) : (
                    <Link to="/login" activeClassName="selected">
                        <div className="menu-item">
                            <div className="menu-item-title">Atsijungti</div>
                            <FaUser />
                        </div>
                    </Link>
                )
        }
    </nav>
);

export default Menu;