import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import logo from '../images/logo.svg';

function Header(props) {
  const history = useHistory();
  const [displayMenuBar, setDisplayMenuBar] = React.useState(false);

  function signOut() {
    localStorage.removeItem('token');
    props.onLogout(false);
    history.push('/sing-in');
  }

  function handleMenuBar() {
    setDisplayMenuBar(!displayMenuBar);
  }

  return (
    <>
      {props.loggedIn && (
        <menu className={`menu${displayMenuBar ? ' menu_enabled' : ''}`}>
          <span className="menu__text">{props.userEmail}</span>

          <button onClick={signOut} className="menu__button">
            Выход
          </button>
        </menu>
      )}

      <header className="header">
        <img src={logo} alt="Логотип" className="header__logo" />

        <div className="header__bar">
          {props.loggedIn ? (
            <>
              <button
                onClick={handleMenuBar}
                className={`header__btn-menu ${
                  displayMenuBar ? 'header__btn-menu_pressed' : ''
                }`}
              >
                <div
                  className={`header__stripe ${
                    displayMenuBar ? 'header__stripe_lowered' : ''
                  }`}
                ></div>
                <div
                  className={`header__stripe ${
                    displayMenuBar ? 'header__stripe_hidden' : ''
                  }`}
                ></div>
                <div
                  className={`header__stripe ${
                    displayMenuBar ? 'header__stripe_rised' : ''
                  }`}
                ></div>
              </button>

              <span className="header__text">{props.userEmail}</span>
              <button onClick={signOut} className="header__button">
                Выход
              </button>
            </>
          ) : (
            <Link to={props.navLink} className="header__link">
              {props.navTitle}
            </Link>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
