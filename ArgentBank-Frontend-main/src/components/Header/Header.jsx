import { useDispatch, useSelector } from "react-redux";
import logo from '../../Assets/img/logoAB.webp';
import { logout } from '../../Redux/Slicer/AuthSlice';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faPowerOff } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth?.user || {});
    const token = useSelector((state) => state.auth?.token);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {token ? (
                    <div className="main-nav-auth">
                        <div className="main-nav-auth-profil">{user.userName || 'User'}</div>
                        <Link className="main-nav-item" to="/profile">
                            <FontAwesomeIcon icon={faUserCircle} />
                            <i className="fa fa-regular fa-gear"></i>
                        </Link>

                        <Link className="main-nav-item" to="/" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faPowerOff} />
                        </Link>
                    </div>
                ) : (
                    <Link className="main-nav-item" to="./login">
                        <FontAwesomeIcon icon={faUserCircle} />
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Header;