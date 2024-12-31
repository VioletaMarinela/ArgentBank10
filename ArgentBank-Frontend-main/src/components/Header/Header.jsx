import { useDispatch, useSelector } from "react-redux";
import logo from '../../Assets/img/argentBankLogo.webp';
import { logout } from '../../Redux/Slicer/AuthSlice';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';

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
                        <Link className="main-nav-item" to="/profile">
                            <FontAwesomeIcon icon={faUserCircle} />
                        </Link>
                        <div className="main-nav-auth-profil">{user.firstName || 'User'}</div>

                        <Link className="main-nav-item" to="/" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOut} />
                            Sign Out
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