import './styles.css';
import 'bootstrap/js/src/collapse.js';
import '../../App.css';
import { Link, NavLink } from 'react-router-dom';


import { useEffect } from 'react';
import history from 'util/history';
import { useContext } from 'react';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import { removeAuthData } from 'util/storage';

const Navbar = () => {

  const {authContextData, setAuthContextData} = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {  // testa se o usuario esta autenticado
      setAuthContextData({
        authenticated: true, //retorna verdadeiro
        tokenData: getTokenData(), //pega o token do usuario
      });
    } else {
      setAuthContextData({
        authenticated: false, //retorna falso
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); //não haver navegação do link
    removeAuthData(); //função pra remover o token do localStorage
    setAuthContextData({
      authenticated: false, // funçao pra passar o autenticado falso
    });
    history.replace('/'); //redireciona o usuario para a tela home
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
      <div className="container-fluid">
        <Link to="/" className="nav-logo-text">
          <h4>DS Catalog</h4>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#dscatalog-navbar"
          aria-controls="dscatalog-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="dscatalog-navbar">
          <ul className="navbar-nav offset-md-3 main-menu">
            <li>
              <NavLink to="/" activeClassName="active" exact>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" activeClassName="active">
                CATÁLOGO
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeClassName="active">
                ADMIN
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-login-logout">
          {authContextData.authenticated ? (
            <>
            <span className="nav-username">{authContextData.tokenData?.user_name}</span>
            <a href="#LOGOUT" onClick={handleLogoutClick}>
              LOGOUT
            </a>
            </>
          ) : (
            <Link to="/admin/auth">LOGIN</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
