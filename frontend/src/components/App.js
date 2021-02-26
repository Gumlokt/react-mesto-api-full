import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from '../utils/auth.js';

import Header from './Header';
import Dashboard from './Dashboard';

import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [isInformerPopupOpen, setInformerPopupOpen] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [messageToUser, setMessageToUser] = useState('');
  const [popupIconSuccess, setPopupIconSuccess] = useState(false);

  function handleCredentialsChange(e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  function handleUser(user) {
    setCurrentUser(user);
  }

  function handleLoggedIn(trueOrFalse) {
    setLoggedIn(trueOrFalse);
  }

  function openInformerPopup(message, successIcon = false) {
    setMessageToUser(message);
    setInformerPopupOpen(true);
    setPopupIconSuccess(successIcon);
  }

  function closeInformerPopup() {
    setInformerPopupOpen(false);
    setMessageToUser('');
    if (popupIconSuccess) {
      setCredentials({ email: '', password: '' });
      history.push('/sing-in');
    }
    setPopupIconSuccess(false);
  }

  function handleLogin(e) {
    e.preventDefault();

    auth
      .authorize(credentials)
      .then((data) => {
        if (!data) {
          openInformerPopup('Что-то пошло не так!');
          return;
        }

        if (data.message) {
          openInformerPopup(data.message);
          return;
        } else if (data.token) {
          setCredentials({ email: '', password: '' });
          handleLoggedIn(true);
          history.push('/');
        } else {
          openInformerPopup('Барабашка взял так и учудил конкретно :-)');
        }
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(e) {
    e.preventDefault();

    auth
      .register(credentials)
      .then((data) => {
        if (!data) {
          openInformerPopup('Что-то пошло не так!');
          return;
        }

        if (data.error) {
          openInformerPopup(data.error);
          return;
        } else {
          openInformerPopup('Регистрация успешна!', true);
          // history.push('/sing-in');
          return;
        }
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');

      if (token) {
        auth
          .getContent(token)
          .then((res) => {
            if (res) {
              setUserEmail(res.email);
              handleLoggedIn(true);
              history.push('/');
            }
          })
          .catch((err) => console.log(err));
      }
    }

    // // Возвращаем функцию, которая удаляет эффекты
    // return () => {
    //   setUserEmail('');
    // };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in">
          <Header navLink="/sign-up" navTitle="Регистрация" />
          <Login
            credentials={credentials}
            onCredentialsChange={handleCredentialsChange}
            loginUser={handleLogin}
          />
        </Route>

        <Route path="/sign-up">
          <Header navLink="/sign-in" navTitle="Войти" />
          <Register
            credentials={credentials}
            onCredentialsChange={handleCredentialsChange}
            registerUser={handleRegister}
          />
        </Route>

        <CurrentUserContext.Provider value={currentUser}>
          <ProtectedRoute
            path="/"
            currentUser={currentUser}
            handleUser={handleUser}
            loggedIn={loggedIn}
            userEmail={userEmail}
            onLogout={handleLoggedIn}
            component={Dashboard}
          />
        </CurrentUserContext.Provider>
      </Switch>

      <InfoTooltip
        message={messageToUser}
        successIcon={popupIconSuccess}
        isOpen={isInformerPopupOpen}
        onClose={closeInformerPopup}
      />
    </div>
  );
}

export default App;
