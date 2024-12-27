import { useDispatch, useSelector } from "react-redux";
import logo from '../../Assets/img/argentBankLogo.webp';
import { logout } from '../../Redux/Slicer/AuthSlice';
import { Link, useNavigate } from "react-router-dom";


function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const handleLogout = () => {
        navigate('/')
        // Dispatchez l'action de déconnexion ici
        dispatch(logout());
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
                        <div className="main-nav-auth-profil">{user.userName}</div>
                        <div>
                            <Link className="main-nav-item" to="/profile">
                                <i className="fa fa-solid fa-user"></i>
                            </Link>

                            <i className="fa fa-solid fa-gear"></i>
                        </div>
                        {token && (
                            <Link className="main-nav-item" to="/" onClick={handleLogout}>
                                Logout
                            </Link>
                        )}
                    </div>

                ) : (
                    <a className="main-nav-item" href={"./login"} >
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </a>
                )}
            </div>
        </nav>
    );
};

export default Header;
