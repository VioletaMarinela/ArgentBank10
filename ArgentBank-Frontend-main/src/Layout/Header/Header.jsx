import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Logo from '../../Assets/img/logoAB.webp';
import '../../Assets/css/main.css';
import 'font-awesome/css/font-awesome.min.css';
import { accountService } from '../../_Service/accountService';

const Header = () => {
    const navigate = useNavigate();
    const userName = useSelector((state) => state.user.userName);

    const logout = () => {
        accountService.logout();
        navigate("/home");
    };

    return (
        <header className="main-nav">

            <NavLink to="/home" className="main-nav-item">
                <img className="main-nav-logo-image" src={Logo} alt="Argent Bank Logo" />
            </NavLink>

            {
                accountService.ConnectorNotConnect() &&
                <div className='userHeaderRight'>
                    <NavLink to="/userprofile" className="main-nav-item">
                        <span>{userName}</span>
                    </NavLink>

                    <NavLink to="/userprofile" className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                    </NavLink>

                    <i className="fas fa-cog"></i>

                    <NavLink to="/home" onClick={logout} className="main-nav-item">
                        <i className="fas fa-power-off"></i>
                    </NavLink>
                </div>
            }
            {
                !accountService.ConnectorNotConnect() &&
                <nav className='navaccueil'>
                    <NavLink to="/signin" className="main-nav-item">
                        <i className="fa fa-user-circle" />
                        Sign In
                    </NavLink>
                </nav>
            }
        </header>
    );
};

export default Header;