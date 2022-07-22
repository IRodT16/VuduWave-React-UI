import React, { useEffect, useState } from 'react';

import Login from './Layout/Login/Login';
import Dashboard from './Layout/Dashboard/Dashboard';

import WelcomeScreen from './Layout/NewRace/WelcomeScreen';

import RaceResults from './Layout/RaceResults/RaceResults';

const Main = (props) => {
  const [loginState, setLoginState] = useState(false);
  const [newRace, setNewRace] = useState(false);
  // const [homeScreen, setHomeScreen] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      await fetch('/api/authenticated', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },

        credentials: 'include',
      }).then((res) => {
        if (res.ok) {
          setLoginState(true);
        } else {
          setLoginState(false);
        }
      });
    };
    checkLogin();
  }, [, loginState]);

  const loginHandler = (props) => {
    setLoginState(true);
  };

  const logoutHandler = (props) => {
    const fetchData = async () => {
      await fetch('/api/logout', {
        method: 'GET',
      });
    };
    fetchData();

    setLoginState(false);
    setNewRace(false);
  };

  const newRaceHandler = (props) => {
    if (!newRace) {
      setNewRace(true);
    } else {
      return;
    }
    // setNewRace((prevState) => !prevState);
  };

  const homeHandler = (props) => {
    setNewRace(false);
  };

  return (
    <div>
      {!loginState && (
        <div className="login">
          <Login onLogin={loginHandler} />
        </div>
      )}

      {loginState && (
        <div className="app">
          <div className="ui">
            <Dashboard
              onLogout={logoutHandler}
              onNewRace={newRaceHandler}
              onHome={homeHandler}
            />
            {!newRace && <WelcomeScreen />}
            {newRace && <RaceResults />}

            {/* <RaceResults /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
